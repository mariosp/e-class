const router = require("express").Router();
const lessonController = require("../controllers/lesson");
const {checkAuthToken, routePermission} = require("../middleware/auth");
const {userRoles} = require("../services/user.service");

//asd
router.get('/',checkAuthToken,  routePermission([userRoles.admin,userRoles.student,userRoles.teacher]), lessonController.getLesson);

router.post('/create', checkAuthToken, routePermission([userRoles.admin]), lessonController.createLesson);

router.post('/enroll', checkAuthToken, routePermission([userRoles.admin]), lessonController.enrollStudent);



module.exports = router;
