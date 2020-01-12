const {validationResult} = require("express-validator");
const {User} = require("../models");
const {comparePassword} = require("../services/password.service");
const { createAuthToken} = require("../services/auth.service");

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: "Wrong email format" });
    }

    const {email, password} = req.body;

    const user = await User.findOne({email});
    user || res.status(404).send({errors: "Wrong credentials"});

    const validPassword = await comparePassword(password, user.password).catch((err) => console.log(err));
    validPassword || res.status(404).send({errors: "Wrong credentials"});
    try {
        const token = createAuthToken(user.id, user.userRole);
        const updatedUser = await User.findOneAndUpdate(user._id, {accessTokens: user.accessTokens.concat({token})}, {
            new: true //return the document after update
        });
        res.send({
            id: updatedUser._id,
            token: token
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({errors: "Server Error"});
    }
};
