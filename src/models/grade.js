const mongoose = require('mongoose');

const gradeSchema = mongoose.Schema({
    student:{
        type: Schema.Types.ObjectId,
        ref: "Student"
    },
    grade: {
        type: Number,
        required: true
    },
    timestamp: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Grade', gradeSchema);
