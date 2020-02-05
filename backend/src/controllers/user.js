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
 getUserById Admin
 Return user's info
*/
exports.getUserById = async (req, res) => {
    const user = await User.findById(req.params.userId).catch(e=>console.log(e))
    user?
        res.send({status:1,data: user}) :
        res.status(400).send({status:0,msg: "error getting the User"});
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
      res.status(400).send({status:0, msg:"Error creating user"});
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userUpdateData = req.body;
        const user = await User.findById(req.user.id);
        user.name = userUpdateData.name;
        user.email = userUpdateData.email;
        if (userUpdateData.password) user.password = await hashPassword(userUpdateData.password); // will update password only if password field is not empty
        await user.save();
        res.send({status: 1, msg: "Your profile has been updated"});
    } catch (e) {
        res.status(400).send({status: 0, msg: "Error updating your info"});
    }
};

/*
 updateUserById ADMIN
 update user profile
*/
exports.updateUserById = async (req, res) => {
    try {
        const userUpdateData = req.body;
        const user = await User.findById(req.params.userId);
        user.name = userUpdateData.name;
        user.email = userUpdateData.email;
        if (userUpdateData.password) user.password = await hashPassword(userUpdateData.password); // will update password only if password field is not empty
        await user.save();
        res.send({status: 1, msg: "User profile has been updated"});
    } catch (e) {
        res.status(400).send({status: 0, msg: "Error updating user"});
    }
};

exports.deleteUser = async (req, res) => {
    // const user = await User.findById(req.params.userId).catch(e=>console.log(e));
    // user.delete();
    // if(user.userRole === userRoles.student){
    //
    // }
    res.send("Not implemented yet");
};

exports.getAllUsers = async (req, res) => {
    const users = await User.find({userRole: { $ne: userRoles.admin }}); //return all user except the admin account
    users? res.send({status:1,data: users}) : res.send({status:0,msg: "Error getting all users"}) ;
};
