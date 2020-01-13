const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/lesson', require('./lesson'));
router.use('/grade', require('./grade'));
router.use('/student', require('./student'));
// router.use('/api/teachers', require('./api/teachers'));
// router.use('/api/students', require('./api/students'));


module.exports = router;
