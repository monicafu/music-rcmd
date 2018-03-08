const userData = require('./user.js');

// For future use

const service = {
	verifyUser: (user) => {
		console.log(`   Verifing user${user.id}...`);
	    console.log(`   Verification finished.`);
	    return true;
	}
}

module.exports = service;