const router = require('express').Router();
const controller = require('../controllers/lessonsController');

router.get('/', controller.getLessons);
router.get('/:id', controller.getDetailsLessons);
router.post('/', controller.addLessons);
router.put('/:id', controller.editLessons);
router.delete('/:id', controller.deleteLessons);

module.exports = router;
