const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/lesson', require('./lesson'));
router.use('/grade', require('./grade'));
router.use('/student', require('./student'));
router.use('/teacher', require('./teacher'));

module.exports = router;
