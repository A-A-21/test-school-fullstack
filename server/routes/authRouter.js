const router = require('express').Router();
const controller = require('../controllers/authController');
const { check } = require("express-validator");
// const authMiddleware = require('../middlewares/authMiddleware');


router.get('/check', controller.check);
router.post('/registration', [
  check('username', "Имя пользователя не может быть пустым").notEmpty(),
  check('useremail', "Email пользователя не может быть пустым").notEmpty(),
  check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({ min: 4, max: 10 })
], controller.registration);
router.post('/login', controller.login);
router.get('/logout', controller.logout);

module.exports = router;
