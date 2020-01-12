const jwt = require('jsonwebtoken');
const {User} = require("../models");

const checkAuthToken = async (req, res, next)=> {
    console.log(req.header('Authorization'));
    try {
        const token = req.header('Authorization').replace('Bearer ', ''); //Remove the Bearer from the start of the token's string
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
        jwtObject ||  res.status(401).send({ errors: "Your need to authenticate" });
        console.log(jwtObject)
        const user = await User.findOne({ _id: jwtObject._id, "accessTokens.token": token });
        console.log(user)
        req.token = token;
        req.user = user;
        next()
    } catch (e) {
        res.status(401).send({ errors: 'Error' });
    }
};

module.exports = {
    checkAuthToken
}
