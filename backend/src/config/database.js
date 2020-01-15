const mongoose = require("mongoose");

/*
Connect to MongoDB
*/
const connect = async () => {
    /*
    Use mongoose set option to fix the deprecation warning
    */
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (e) {
        console.log("error connecting with database");
        process.exit(1); //Stop the app if a failure occure with connection
    }
};

module.exports = {
    connect
}
