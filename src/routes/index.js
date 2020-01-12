const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/lesson', require('./lesson'));
// router.use('/api/teachers', require('./api/teachers'));
// router.use('/api/students', require('./api/students'));
// router.use('/api/grades', require('./api/grades'));

module.exports = router;
