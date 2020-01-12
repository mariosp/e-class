const router = require("express").Router();
const authController = require("../controllers/auth");
const {check} = require("express-validator");

router.post('/login',
    check("email").isEmail(),
    authController.login
);

module.exports = router;
