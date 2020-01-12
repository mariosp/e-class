const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lesson: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    },
});

module.exports = mongoose.model('Teacher', teacherSchema);
