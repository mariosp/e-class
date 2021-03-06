const mongoose = require('mongoose');

const lessonSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    teacher:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    },
    enrolledStudents:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    ]
});

module.exports = mongoose.model('Lesson', lessonSchema);
