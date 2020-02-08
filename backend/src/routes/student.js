const router = require("express").Router();
const studentController = require("../controllers/student");
const {checkAuthToken, routePermission} = require("../middleware/auth");
const {userRoles} = require("../services/user.service");


router.get('/getallenrolledlessons',checkAuthToken,  routePermission([userRoles.student]), studentController.getAllEnrolledLessons);

router.get('/getNotenrolledStudents/:lessonId',checkAuthToken,  routePermission([userRoles.admin]), studentController.getNotEnrolledStudents);

module.exports = router;
