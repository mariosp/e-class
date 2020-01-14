const jwt = require("jsonwebtoken");

/*
 createAuthToken
 Create a Jwt token using the jwt.sign method
 The token expiriration is 1h
*/
const createAuthToken = (userID,userRole)=> {
    return jwt.sign({_id: userID, role: userRole}, process.env.JWT_SECRET, {expiresIn: '1 h'});
};

module.exports = {
    createAuthToken
};
