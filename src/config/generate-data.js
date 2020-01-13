const {User, Student, Teacher, Lesson} = require("../models");
const {userController} =require("../controllers/user")

exports.generateAdmin = async () => {
    const admin = await new User({
        name: 'Admin Name',
        email: 'admin@gmail.com',
        password: 'marios',
        userRole: 'admin'
    });
    await admin.save();
};

exports.generateData = async ()=> {
    //create users
    const res = {
        send: (response)=>{
            console.log(response);
        }
    };

    const teachers = [];
    for(let i=0;i<5;i++) { //10 teachers
        userController.createUser({body:{
                name: `Teacher Name ${i}`,
                email: `teacher${i}@gmail.com`,
                password: `password${i}`,
                userRole: 'teacher'
            }
        }, res)
    }

    Teacher.find({});

    const students = [];
    for(let i=0;i<5;i++) { //10 students
        const student = await new User({
            name: `Student Name ${i}`,
            email: `student${i}@gmail.com`,
            password: `password${i}`,
            userRole: 'student'
        });
        await student.save();
        students.push(student);
    }

    for(let i=0;i<5;i++) { //create 5 lessons
        const lesson =
    }



};
