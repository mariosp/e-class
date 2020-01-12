const jwt = require('jsonwebtoken');
const {User} = require("../models");

// Router level middleware to Check the Jwt token if is valid
const checkAuthToken = async (req, res, next)=> {
    console.log(req.header('Authorization'));
    try {
        const token = req.header('Authorization').replace('Bearer ', ''); //Remove the Bearer from the start of the token's string
        const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
        jwtObject ||  res.status(401).send({ status:0,msg: 'Your need to authenticate ' });
        console.log(jwtObject)
        const user = await User.findOne({ _id: jwtObject._id, "accessTokens.token": token });
        user || res.status(401).send({ status:0,msg: 'Your need to authenticate ' });
        req.token = token;
        req.user = user.toJSON(); // toJson middleware to remove password field and accessTokens Array
        next();
    } catch (e) {
        res.status(401).send({ status:0,msg: 'Your need to authenticate ' });
    }
};


const routePermission =  (routePermissions) => {
    return  (req, res, next) => {
        const permitted = routePermissions.some((permission)=> req.user.userRole === permission);
        console.log(permitted);
        permitted && next();
        permitted || res.status(401).send({error: "Not permitted"});
    }

};

module.exports = {
    checkAuthToken,
    routePermission
}
