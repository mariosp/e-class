const mongoose= require('mongoose');
const {userRoles} = require('../services/user.service')

const userSchema= mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        index: { unique: true},
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
    },
    userRole: {
        type: String,
        default: 'student',
        enum: [
            "admin",
            "student",
            "teacher"
        ]
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher"
    },
    accessTokens:[
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

/**
 * Override default toJSON, remove password field and __v version
 */
userSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.password;
    delete obj.__v;
    delete obj.accessTokens;
    obj.id = obj._id;
    delete obj._id;
    return obj;
};

userSchema.pre('deleteOne',{ document: true, query: false }, async function() {
    const user = this;
    if(user.userRole === userRoles.student){
        const student = await user.model('Student').findById(user.student);
        student.deleteOne();
    }
});



module.exports= mongoose.model('User',userSchema);
