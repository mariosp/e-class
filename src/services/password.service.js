const bcrypt = require("bcryptjs");

/*
 hashPassword
 make the plain password hashed
*/
const hashPassword = async (password)=> {
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 10); //auto-generate a salt and hash
    } catch (e) {
        console.log(e);
    }
    return hashedPassword;
};

/*
 comparePassword
 comporate the plain password with the hashed on DB
*/
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
