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

module.exports = mongoose.model('Student', studentSchema);
