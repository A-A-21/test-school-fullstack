const router = require('express').Router();
const controller = require('../controllers/authController');
const { check } = require("express-validator");
// const authMiddleware = require('../middlewares/authMiddleware');


router.post('/registration', [
  check('username', "Имя пользователя не может быть пустым").notEmpty(),
  check('useremail', "Email пользователя не может быть пустым").notEmpty(),
  check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({ min: 4, max: 10 })
], controller.registration);
router.post('/login', controller.login);
router.get('/users', controller.getUsers);
router.delete('/users/:id', controller.deleteUser);
router.put('/users/:id', controller.changeUser);


module.exports = router;
