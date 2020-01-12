const {User, Student, Teacher, Lesson} = require("../models");
const {hashPassword} = require("../services/password.service");
const {userRoles} = require("../services/user.service");


exports.getLesson = (req, res) => {
    res.send("NOT IMPLEMENTED YET")
};


exports.createLesson = async (req, res) => {
    let lesson, teacherResult;
    let {title,teacher} = req.body;
    if(title && teacher) {
        try{
            teacherResult = await Teacher.findOne({_id: teacher});
            console.log(teacherResult);
            if(teacherResult.lesson){ res.send({status:0,msg: "Teacher already has a lesson"}); return; }

            lesson =  new Lesson({title, teacher});

            if(lesson) {
                lesson.save();
                await Teacher.findByIdAndUpdate({_id: teacher}, {lesson: lesson._id});
                res.send({status:1,msg:"Lesson Created"});
            }
        } catch (e) {
            console.log(e);
            res.status(500).send({status:1, msg:"error creating Lesson"});
        }
        res.send({status:1, msg: "Lesson created",data:lesson});
    } else {
        res.status(400).send({status:0, msg: "Your need to set a title and teacher"});
    }
};

