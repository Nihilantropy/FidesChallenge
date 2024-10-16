/* ====== HASHING PASSWORD ====== */
const bcrypt = require('bcryptjs');
const hashPassword = (password) => {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    return hash;
};
export default hashPassword;