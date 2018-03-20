const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.resolve(__dirname, './client/build/images'));
	},
	filename: function(req, file, cb) {
		const imgName = req.body.album.toLowerCase().replace(/\s+/g, '-');
		cb(null, imgName + '.jpg');
	},
});

const upload = multer({
	storage: storage
});

module.exports = upload;