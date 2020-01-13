const {User, Student, Teacher, Lesson} = require("../models");
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

exports.enrollStudent = async (req, res) => {
    const {student,lesson} = req.body;
    let lessonResult,studentResult;
    try{
        if(!student || !lesson){return res.status(400).send({status:0,msg:"Please check payload"})}
        const studentObject = await Student.findById(student);
        console.log(studentObject)
        if(!studentObject){return res.status(400).send({status:0,msg:"Student not found"});}
        const lessonResult = await Lesson.findByIdAndUpdate(lesson,{ $addToSet: { enrolledStudents: studentObject._id }});
        if(!lessonResult){ return res.status(400).send({status:0,msg:"Student is already enrolled"});}
        studentResult = await Student.findOneAndUpdate({_id:studentObject._id,'courses.lesson':{'$ne':lesson}}, { $push: { courses: {lesson:lesson} }}, {new:true});
        if(!studentResult){ return res.status(400).send({status:0,msg:"Student is already enrolled"});}

        res.send({status:1,msg:"Student has been enrolled"});
    } catch (e) {
        console.log(e);
        res.status(400).send({status:0,msg:"Error enrolling student to lesson"});

    }
};

