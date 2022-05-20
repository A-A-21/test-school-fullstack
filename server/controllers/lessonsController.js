const Lesson = require('../models/Lesson');
const User = require("../models/User");

class lessonController {

  async getLessons(req, res) {
    try {
      const id = req.session?.userId;
      if (!id) {
        return res.json({ message: "Сначала надо зарегистрироваться" });
      }
      const lessons = await Lesson.find();
      res.json({ lessons });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'error' });
    }
  }

  async getDetailsLessons(req, res) {
    try {
      const id = req.session?.userId;
      if (!id) {
        return res.json({ message: "Сначала надо зарегистрироваться" });
      }
      const lesson = await Lesson.findOne({ id: Number(req.params.id) });
      res.json({ lesson });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'error' });
    }
  }

  async addLessons(req, res) {
    try {
      const { title, text } = req.body;
      const useremail = req.session.email;
      const lesson = new Lesson({ title, text, author: useremail });
      await lesson.save();
      return res.json({ message: "Вы успешно добавили новый урок", lesson });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'error' });
    }
  }

  async editLessons(req, res) {
    try {
      const { id } = req.params;
      console.log(req.params);
      const lesson = await Lesson.findOne({ id });
      return res.json({ message: "Держи", lesson });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'error' });
    }
  }

  async deleteLessons(req, res) {
    try {
      return res.json({ message: "Держи" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'error' });
    }
  }
}

module.exports = new lessonController();
