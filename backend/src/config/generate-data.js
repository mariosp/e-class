const {User, Student, Teacher, Lesson} = require("../models");
const {userController} =require("../controllers/user");
const router = require("express").Router();
const {hashPassword} = require("../services/password.service");
const {checkAuthToken, routePermission} = require("../middleware/auth");
const {userRoles} = require("../services/user.service");

//Generate an admin user if does not exist
const generateAdmin = async (req,res) => {
    const hasAdmin = await User.findOne({userRole:'admin'});
    if(!hasAdmin) {
        const admin = await new User({
            name: 'Admin Account',
            email: 'admin@admin.com',
            password: await hashPassword("administrator"),
            userRole: 'admin'
        });
        await admin.save();
        return res.send({status:1, msg:"Admin created"});
    }
    res.send({status:0, msg:"Admin exist"});
};

const generateData = async (req,res)=> {

    const teachers = [];
    for(let i=0;i<5;i++) { //10 teachers
       const teacherUser = {
           name: `Teacher Name ${i}`,
           email: `teacher${i}@gmail.com`,
           password: await hashPassword(`password${i}`),
           userRole: 'teacher'
        };
        const tuser = await new User({...teacherUser});
        const userRoleT = await new Teacher({user: tuser._id});
        tuser.teacher = userRoleT._id;
        await tuser.save();
        await userRoleT.save();
        teachers.push(userRoleT);
        console.log("USER CREATED");
    }
    console.log(teachers);
    const lessons = [];
    for(let i=0;i<5;i++) {
        const title = `LESSON NAME ${i}`;
        const teacher = teachers[i]._id;
        const lesson = await new Lesson({title, teacher});

        if (lesson) {
            await lesson.save();
            await Teacher.findByIdAndUpdate({_id: teacher}, {lesson: lesson._id});
            console.log("LESSON CREATED");
            lessons.push(lesson);
        }
    }

    const students = [];
    for(let i=0;i<10;i++) { //10 teachers
        const studentUser = {
            name: `Student Name ${i}`,
            email: `student${i}@gmail.com`,
            password: await hashPassword(`password${i}`),
            userRole: 'student'
        };
        const suser = await new User({...studentUser});
        const userRoleS = await new Student({user: suser._id});
        suser.student = userRoleS._id;
        await suser.save()
        await userRoleS.save();
        students.push(userRoleS);
        console.log("STUDENT CREATED");
    }
    console.log(students);

    for(let i=0;i<10;i++) {
        let y =0;
        while(y<5) {
            const lessonResult = await Lesson.findByIdAndUpdate(lessons[y]._id, {$addToSet: {enrolledStudents: students[i]._id}});
            const studentResult = await Student.findOneAndUpdate({_id:students[i]._id,'courses.lesson':{'$ne': lessons[y]._id}}, { $push: { courses: {lesson:lessons[y]._id} }}, {new:true});
        }
        console.log("STUDENT ENROLLED TO ALL LESSONS")
    }



    res.send({msg:"Completed"})
};


router.get('/generateadmin', generateAdmin);

router.get('/generatedata', checkAuthToken, routePermission([userRoles.admin]), generateData);

module.exports = router;
