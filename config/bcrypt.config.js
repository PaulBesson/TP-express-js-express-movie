import bcrypt from 'bcrypt';

// const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPassword(pwdClear) {
	try {
		const hash = await bcrypt.hash(pwdClear, saltRounds);
		return hash;
	} catch (err) {
		throw new Error("Error hashing password !");
		
	}
}

async function comparePassword(pwdClear, pwdHash) {
	try {
		const result = await bcrypt.compare(pwdClear, pwdHash);
		return result;
	} catch (err) {
		throw new Error("Error comparing passwords !");
		
	}
}

export default { hashPassword, comparePassword}