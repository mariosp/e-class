const router = require("express").Router();
const userController = require("../controllers/user");
const {checkAuthToken, routePermission} = require("../middleware/auth");
const {userRoles} = require("../services/user.service");

router.get('/',checkAuthToken,  routePermission([userRoles.admin,userRoles.student,userRoles.teacher]), userController.getUser);

router.post('/create', checkAuthToken, routePermission([userRoles.admin]), userController.createUser);

router.get('/getAllUsers', checkAuthToken, routePermission([userRoles.admin]), userController.getAllUsers);



module.exports = router;

