const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');

const { validationResult } = require("express-validator");


class authController {

  async registration(req, res) {
    try {
      console.log(req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Ошибка при регистрации", errors });
      }
      const { username, useremail, password, roles } = req.body;
      const candidate = await User.findOne({ useremail });
      if (candidate) {
        return res.status(400).json({ message: 'Пользователь с таким именем уже существует' });
      }
      const hashPassword = bcrypt.hashSync(password, 9);
      const userRole = await Role.findOne({ value: roles });
      const user = new User({ username, useremail, password: hashPassword, roles: [userRole.value] });
      await user.save();
      req.session.userId = user.id;
      req.session.roles = roles;
      req.session.email = useremail;
      let userRoles = (roles === 'TEACHER') ? true : null;
      return res.json({ message: 'Пользователь успешно зарегистрирован', id: user.id, roles: userRoles });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
      const { useremail, password } = req.body;
      const user = await User.findOne({ useremail });
      if (!user) {
        return res.status(400).json({ message: `Пользователь ${useremail} не найден` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: `Введен неверный пароль` });
      }
      req.session.userId = user.id;
      req.session.roles = user.roles;
      req.session.email = useremail;
      let userRoles = (user.roles[0] === 'TEACHER') ? true : null;
      return res.json({ message: 'Пользователь успешно авторизован', id: user.id, roles: userRoles });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Login error' });
    }
  }

  async logout(req, res) {
    try {
      req.session.destroy();
      res.clearCookie('auth');
      res.status(200).json({ message: 'Вы успешно вышли' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Error' });
    }
  }

  // async createRole(req, res) {
  //   try {
  //     const teacherRole = new Role({ value: "TEACHER" });
  //     const studentRole = new Role({ value: "STUDENT" });
  //     await teacherRole.save();
  //     await studentRole.save();
  //   } catch (e) {
  //
  //   }
  // } // для того что завести в базу дефолтные роли


}

module.exports = new authController();
