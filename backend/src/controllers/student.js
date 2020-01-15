const {User, Student, Teacher, Lesson} = require("../models");
const {userRoles} = require("../services/user.service");

/*
 getAllEnrolledLessons STUDENT
 Return student's lessons that is enrolled
*/
exports.getAllEnrolledLessons = async (req, res) => {
    const user = req.user;
    const populateQuery = [
        {
            path:'courses.lesson',
            select:'title teacher -_id',
            populate : {
                path : 'teacher',
                select:'user -_id',
                populate: {
                    path:'user',
                    select:'name -_id'
                }
            }
        },
        {path:'courses.grade', select:'grade timestamp -_id'}
        ];
    try{
    await Student.findById({_id: user.student})
        .populate(populateQuery).exec((err, courses)=>{
            if(err) return res.status(400).send({status:0,msg:"Error"});
            return  res.send(courses);
        });
    }catch (e) {
        console.log(e);
        res.send({status:0,msg:"Not found"})
    }

};