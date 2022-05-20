const router = require('express').Router();
const controller = require('../controllers/lessonsController');
const lessonsMiddleware = require('../middlewares/lessonsMiddleware');
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/img');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.get('/', controller.getLessons);
router.get('/:id', controller.getDetailsLessons);
router.post('/', upload.single('file'), lessonsMiddleware, controller.addLessons);
router.put('/:id', upload.single('file'), lessonsMiddleware, controller.editLessons);
router.delete('/:id', lessonsMiddleware, controller.deleteLessons);

module.exports = router;
