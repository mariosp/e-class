const router = require("express").Router();
const lessonController = require("../controllers/lesson");
const {checkAuthToken, routePermission} = require("../middleware/auth");
const {userRoles} = require("../services/user.service");

// router.get('/',checkAuthToken,  routePermission([userRoles.admin,userRoles.student,userRoles.teacher]), lessonController.getLesson);

router.get('/getAllLessons',checkAuthToken,  routePermission([userRoles.admin]), lessonController.getAllLessons);

router.post('/create', checkAuthToken, routePermission([userRoles.admin]), lessonController.createLesson);

router.post('/enroll', checkAuthToken, routePermission([userRoles.admin]), lessonController.enrollStudent);



module.exports = router;
