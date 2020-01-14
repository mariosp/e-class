const {User, Student, Teacher, Lesson, Grade} = require("../models");

/*
 addGrade TEACHER
 Add a grade on a student
 - Teacher can only add grades to the students who are enrolled on his lesson
*/
exports.addGrade = async (req, res) => {
    const {grade, student} = req.body;

    try {
        const teacher = await Teacher.findOne({_id: req.user.teacher});
        if (!teacher) return res.status(404).send({status: 0, msg: "Not Found"});
        const lesson = await Lesson.findOne({_id: teacher.lesson, enrolledStudents: student}); // Check if teacher role can edit this student by checking if student is enrolled on lesson
        if (!lesson) return res.status(404).send({status: 0, msg: "not permitted to add grade on this student"});
        const gradeResult = await new Grade({
            student,
            grade,
            timestamp: Date.now()
        });
        await gradeResult.save();
        const studentResult = await Student.updateOne({_id: student,'courses.lesson':lesson._id},{ $set: { "courses.$.grade" : gradeResult._id } }, {new:true});
        console.log(studentResult);
        res.send({status:1,msg:"Grade updated"});
    } catch (e) {
        console.log(e);
        res.status(404).send({status: 0, msg: "error"});
    }
};
