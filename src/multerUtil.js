let multer = require('multer');

let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './public/images')
	},
	filename: function(req, file, cb) {
		let imgName = req.body.album.toLowerCase().replace(/\s+/g, '-');
		cb(null, imgName + '.jpg');
	},
});

const upload = multer({
	storage: storage
});

module.exports = upload;