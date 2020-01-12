const {User, Student, Teacher} = require("../models");
const {hashPassword} = require("../services/password.service");

exports.getUser = (req, res) => {
    res.send('NOT IMPLEMENTED: getUser');
};

exports.createUser = async (req, res) => {
    let userRole;
    const password = await hashPassword(req.body.password);
    const user = new User({...req.body, password});
    switch (user.userRole) {
        case "student":
            userRole = new Student({user: user._id});
            user.student = userRole._id;
            break;
        case "teacher":
            userRole = new Teacher({user: user._id});
            user.teacher = userRole._id;
            break;
    }

    try{
        await user.save();
        await userRole.save();
    } catch (e) {
      console.log(e);
      res.status(500);
      res.send("Error creating user");
    }


    res.send(`User ${user.name} created`);
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
