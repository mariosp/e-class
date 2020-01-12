const jwt = require("jsonwebtoken");

const createAuthToken = (userID,userRole)=> {
    return jwt.sign({_id: userID, role: userRole}, process.env.JWT_SECRET, {expiresIn: '1 h'});
};

module.exports = {
    createAuthToken
};
