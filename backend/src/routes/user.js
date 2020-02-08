const router = require("express").Router();
const userController = require("../controllers/user");
const {checkAuthToken, routePermission} = require("../middleware/auth");
const {userRoles} = require("../services/user.service");

router.get('/',checkAuthToken,  routePermission([userRoles.admin,userRoles.student,userRoles.teacher]), userController.getUser);

router.patch('/', checkAuthToken, routePermission([userRoles.admin,userRoles.student,userRoles.teacher]), userController.updateUser);

router.get('/getAllUsers', checkAuthToken, routePermission([userRoles.admin]), userController.getAllUsers);

router.get('/:userId',checkAuthToken,  routePermission([userRoles.admin]), userController.getUserById);

router.patch('/:userId', checkAuthToken, routePermission([userRoles.admin]), userController.updateUserById);

router.delete('/:userId', checkAuthToken, routePermission([userRoles.admin]), userController.deleteUser);

router.post('/create', checkAuthToken, routePermission([userRoles.admin]), userController.createUser);




module.exports = router;

