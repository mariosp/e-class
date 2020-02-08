const router = require("express").Router();
const teacherController = require("../controllers/teacher");
const {checkAuthToken, routePermission} = require("../middleware/auth");
const {userRoles} = require("../services/user.service");


router.get('/getteacherlesson',checkAuthToken,  routePermission([userRoles.teacher]), teacherController.getTeacherLesson);

router.get('/getTeachersWithoutLesson',checkAuthToken,  routePermission([userRoles.admin]), teacherController.getTeachersWithoutLesson);

module.exports = router;
