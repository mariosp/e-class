const router = require("express").Router();
// const {User, Student, Teacher} = require("../models");
const userController = require("../controllers/user");

//asd
router.get('/', userController.getUser);


module.exports = router;

