const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    lesson: {
        type: Schema.Types.ObjectId,
        ref: 'Lesson'
    },
});

module.exports = mongoose.model('Teacher', teacherSchema);
