const router = require('express').Router();
const controller = require('../controllers/lessonsController');
const lessonsMiddleware = require('../middlewares/lessonsMiddleware');

router.get('/', controller.getLessons);
router.get('/:id', controller.getDetailsLessons);
router.post('/', lessonsMiddleware, controller.addLessons);
router.put('/:id', lessonsMiddleware, controller.editLessons);
router.delete('/:id', lessonsMiddleware, controller.deleteLessons);

module.exports = router;
