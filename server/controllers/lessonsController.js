const Lesson = require('../models/Lesson');

class lessonController {

  async getLessons(req, res) {
    try {
      const id = req.session?.userId;
      if (!id) {
        return res.json({ message: "Сначала надо зарегистрироваться" });
      }
      const lessons = await Lesson.find();
      res.json(lessons);
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
      res.json(lesson);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'error' });
    }
  }

  async addLessons(req, res) {
    try {
      const { title, text } = req.body;
      const file = req.file ? `/img/${req.file.originalname}` : '';
      const lesson = new Lesson({
        title,
        text,
        author: req.session.email,
        img: file,
      });
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
      const { title, text } = req.body;
      const img = req.file?.originalname;
      const useremail = req.session?.email;
      const lesson = await Lesson.findOne({ _id: id });
      if (useremail !== lesson.author[0]) {
        return res.json({ message: 'Нет прав доступа' });
      }
      if (img) {
        lesson.img = `/img/${req.file.originalname}`;
      }
      lesson.title = title;
      lesson.text = text;
      await lesson.save();
      return res.json({ message: "Держи", lesson });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'error' });
    }
  }

  async deleteLessons(req, res) {
    try {
      const { id } = req.params;
      const useremail = req.session?.email;
      const lesson = await Lesson.findOne({ _id: id });
      if (useremail !== lesson.author[0]) {
        return res.json({ message: 'Нет прав доступа' });
      }
      await Lesson.deleteOne({ _id: id });
      return res.sendStatus(201);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'error' });
    }
  }
}

module.exports = new lessonController();
