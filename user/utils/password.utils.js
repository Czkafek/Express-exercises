const bcrypt = require("bcrypt");

const genPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}

const verifyPassword = async (inputPassword, hashPassword) => {
    return await bcrypt.compare(inputPassword, hashPassword)
}

module.exports = { genPassword, verifyPassword };