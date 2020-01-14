const router = require("express").Router();
const authController = require("../controllers/auth");
const {checkAuthToken} = require("../middleware/auth")
const {check} = require("express-validator");

router.post('/login',
    check("email").isEmail(),
    authController.login
);

router.get('/logout', checkAuthToken, authController.logout);

router.get('/logoutall', checkAuthToken, authController.logoutAll);

module.exports = router;
