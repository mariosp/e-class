const router = require("express").Router();
const userController = require("../controllers/user");
const {checkAuthToken} = require("../middleware/auth");

//asd
router.get('/', userController.getUser);

router.post('/create', checkAuthToken, userController.createUser);

// router.patch('/', userController.createUser);



module.exports = router;

