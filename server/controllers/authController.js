const User = require('../models/User');
const bcrypt = require('bcryptjs');

const { validationResult } = require("express-validator");


class authController {

  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Ошибка при регистрации", errors });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
      }
      const hashPassword = bcrypt.hashSync(password, 9);
      const user = new User({ username, password: hashPassword });
      await user.save();
      return res.json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: `Пользователь ${username} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` });
      }
      const token = generateAccessToken(user._id);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login error' });
    }
  }

  async getUsers(req, res) {
    try {
      console.log(req.user);
      const users = await User.find();
      const token = generateAccessToken(req.user._id);
      res.json({ users, token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'error' });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const token = generateAccessToken(req.user._id);
      await User.deleteOne({ id });
      res.json({ message: "Пользователь успешно удалён" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'error' });
    }
  }

  async changeUser(req, res) {
    try {
      const { username } = req.body;
      const token = generateAccessToken(req.user._id);
      const user = await User.findOne({ id: Number(req.params.id) });
      if (!user) {
        return res.status(400).json({ message: "Нет прав доступа" });
      }
      user.username = username;
      await user.save();
      return res.json({ message: "Вы успешно сменили username", token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'error' });
    }
  }

}

module.exports = new authController();
