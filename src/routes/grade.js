const router = require("express").Router();
const gradeController = require("../controllers/grade");
const {checkAuthToken, routePermission} = require("../middleware/auth");
const {userRoles} = require("../services/user.service");


router.post('/add', checkAuthToken, routePermission([userRoles.admin,userRoles.teacher]), gradeController.addGrade);


module.exports = router;
