const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    courses: [
        {
            lesson: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Lesson'
            },
            grade: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Grade'
            },
        }
    ]
});

studentSchema.pre('deleteOne',{ document: true, query:false}, async function () {
    const student = this;
        await student.model('Lesson').updateMany({}, { $pull: { enrolledStudents: student._id}});
        await student.model('Grade').deleteMany({student: student._id});
});

module.exports = mongoose.model('Student', studentSchema);
