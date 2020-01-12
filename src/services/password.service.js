const bcrypt = require("bcryptjs");

const hashPassword = async (password)=> {
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 10);
    } catch (e) {
        console.log(e);
    }
    return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
    let validPassword;
    try {
        validPassword = await bcrypt.compare(password, hashedPassword)
    } catch (e) {
        console.log(e);
        throw new Error("Server Error");
    }

    return validPassword;

};


module.exports = {
    hashPassword,
    comparePassword
};
