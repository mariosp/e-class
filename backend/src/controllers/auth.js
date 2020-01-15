const {validationResult} = require("express-validator");
const {User} = require("../models");
const {comparePassword} = require("../services/password.service");
const { createAuthToken} = require("../services/auth.service");

/*
 Login User
 verify user's password and if it's valid generate a JWT token
*/
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: "Wrong email format" });
    }

    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(404).send({status:0, msg: "Wrong credentials"});

    const validPassword = await comparePassword(password, user.password).catch((err) => console.log(err)); //compare password function using bcrypt compare
    if(!validPassword) return res.status(404).send({status:0, msg: "Wrong credentials"});
    try {
        const token = createAuthToken(user._id, user.userRole);
        const updatedUser = await User.findOneAndUpdate({_id: user._id}, {accessTokens: user.accessTokens.concat({token})}, {
            new: true //return the document after update
        });
        return res.send({
            id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            userRole: updatedUser.userRole,
            token: token
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({status:0, msg: "Server error"});
    }
};

/*
 logout ALL
 Remove current JWT token
*/
exports.logout = async (req, res) => {
    const user = req.user;
    const userResult = await User.findOneAndUpdate({_id: req.user.id},{ $pull: { accessTokens: { token: req.token } } });
    res.send({status:1,msg:"logged out"});
};

/*
 logout ALL
 Remove all accessTokens
*/
exports.logoutAll = async (req, res) => {
    const userResult = await User.findOneAndUpdate({_id: req.user.id},{ accessTokens: [] });
    res.send({status:1,msg:"logged out from all devices"});
};


