const {User, Student, Teacher} = require("../models");
const {hashPassword} = require("../services/password.service");
const {userRoles} = require("../services/user.service");

/*
 getUser ALL
 Return user's info
*/
exports.getUser = (req, res) => {
    let user = req.user;
    user?
        res.send({status:1,data: user}) :
        res.status(500).send({status:0,msg: "error getting your info"});
};

/*
 createUser ADMIN
 Create a new user
*/
exports.createUser = async (req, res) => {
    let userRole;
    const password = await hashPassword(req.body.password);
    const user = new User({...req.body, password});
    switch (user.userRole) {
        case userRoles.student:
            userRole = new Student({user: user._id});
            user.student = userRole._id;
            break;
        case userRoles.teacher:
            userRole = new Teacher({user: user._id});
            user.teacher = userRole._id;
            break;
    }

    try{
        await user.save();
        await userRole.save();
        res.send({status:1,msg:`User ${user.name} created`});
    } catch (e) {
      console.log(e);
      res.status(500).send({errors:"Error creating user"});
    }
};

exports.updateUser = (req, res) => {
    res.send('NOT IMPLEMENTED: updateUser');
};

exports.deleteUser = (req, res) => {
    res.send('NOT IMPLEMENTED: deleteUser');
};

// exports.getAllUsers = (req, res) => {
//     res.send('NOT IMPLEMENTED: deleteUser');
// };
