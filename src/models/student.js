const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    courses: [
        {
            lesson: {
                type: Schema.Types.ObjectId,
                ref: 'Lesson'
            },
            grade: {
                type: Schema.Types.ObjectId,
                ref: 'Grade'
            },
        }
    ]
});

module.exports = mongoose.model('Student', studentSchema);
