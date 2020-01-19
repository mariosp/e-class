const {User, Student, Teacher, Lesson} = require("../models");

/*
 GetTeacherLesson TEACHER
 Return all teacher's info for the lesson {title, lesson_id, enrolled users}
 -Wont return info that teacher is not permitted to see, like other lessons a student is enrolled
*/
exports.getTeacherLesson = async (req, res) => {
    const user = req.user;
    let lesson;
    try{
       const lesson =  await Lesson.findOne({teacher: user.teacher},{new:true});
        const populateQuery = [
            {
                path:'enrolledStudents',
                populate: {
                    path:'user',
                    select:'name -_id'
                },
            },
            {
                path:'enrolledStudents',
                populate: {
                    path:'courses.lesson',
                    match : {'_id': lesson._id},
                },

            },
            {
                path:'enrolledStudents',
                populate: {
                    path:'courses.grade',
                    select: 'grade timestamp'
                },

            }
        ];

        await Lesson.findOne({teacher: user.teacher}).populate(populateQuery).lean().exec((err,lesson)=>{
            if(!lesson)  return res.send({status:0,msg:"Error"});

            const final = lesson.enrolledStudents.map(element => {
                console.log(element)
                let studentLesson = element.courses.find(value => {
                    if(value.lesson) return value;
                });
                studentLesson.user = element.user.name;
                studentLesson._id = element._id
                delete studentLesson.lesson;
                delete studentLesson.courses;

                return studentLesson;
            });


            const resultJson = {
                lessonTitle: lesson.title,
                _id: lesson._id,
                enrolledStudents: final
            };
            res.send(resultJson)

        });

    }catch (e) {
        console.log(e);
        res.send({status:0,msg:"Not found"})
    }

};
