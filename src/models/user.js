const mongoose= require('mongoose');
const userSchema=mongoose.Schema({
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
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
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
        type: Schema.Types.ObjectId,
        ref: "Student"
    },
    teacher: {
        type: Schema.Types.ObjectId,
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
    var obj = this.toObject();
    delete obj.password;
    delete obj.__v;
    obj.id = obj._id;
    delete obj._id;
    return obj;
};

module.exports= mongoose.model('User',userSchema);
