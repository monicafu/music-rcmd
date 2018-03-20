// --- Initialization ---
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.resolve(__dirname, './client/build')));
const jsonParser = bodyParser.json({extended: true, type: '*/*'});
const upload = require('./multerUtil').single('image');

// --- Data ---
let musicList = require('./music');
let userData = require('./user');
const userIdGenerator = function* (num) {
    let id = 1;
    while(true) {
        yield id;
        id = id % num + 1;
    }
    return;
}(3);
const musicIdGenerator = function* (num) {
    let id = num;
    while(true) {
        id++;
        yield id;
    }
    return;
}(20);


// --- Services functions ---
const {verifyUser} = require('./service.js');


// --- Rounter ---
/* Get user request */
app.get('/getUserData', function(req, res) {
    const id = userIdGenerator.next().value;
    console.log(`-- user${id} is browsing`);
    res.status(200).send( JSON.stringify(userData[id]) );
});

/* Get music list request */
app.post('/getMusic', jsonParser, function(req, res) {
    const data = req.body;

    if (verifyUser(data)) {
        res.status(200).send( JSON.stringify(musicList) );
    }
    else {
        res.status(400).send( {"msg": "user-name-or-password-invalid" } );
    }
});

/* Update votes request */
app.post('/updateUpvote', jsonParser, function(req, res) {
    const data = req.body;
    console.log(' * Update upvote ' + data.id);

    if (data.id === 'error') {
        res.status(500).send( {"msg": "update-upvote-fails"} );
    } else {
        updateUpvote(data);
        res.status(200).send( {"msg": "update-upvote-succeeds"} );
    }
});

/* Edit request */
app.post('/updateMusic', jsonParser,function (req, res) {
    const data = req.body;
    console.log(' * Update music ' + data.id);

    if (data.id === 'error') {
        res.status(500).send( {"msg": "update-music-fails"} );
    } else {
        updateMusic(data);
        res.status(200).send( {"msg": "update-music-succeeds"} );
    }
});

/* Delete request */
app.post('/deleteMusic', jsonParser, function (req, res) {
    const data = req.body
    console.log(' * Delete music ' + data.id);

    if (data.id === 'error') {
        res.status(500).send( {"msg": "delete-music-fails"} );
    }
    else {
        deleteMusic(data.id);
        res.status(200).send( {"msg": "delete-music-succeeds"} );
    }
});

/* Upload request */
app.post('/uploadMusic', upload, function (req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    const data = req.body;
    console.log(' * Upload music ' + data.title);

    if (req.body) {
        uploadMusic(data);
        res.status(200).send( JSON.stringify(musicList) );
    }
    else {
        res.status(500).send( {"msg": "upload-music-fails"} );
    }
});


// --- Logic of update the data on the server memory ---
function updateUpvote( {id, isLiked, userId} ) {
    if (isLiked){
        userData[userId].like.push(id);
        musicList[id].upvote++;
    }else{
        userData[userId].like.splice(userData[userId].like.indexOf(id), 1);
        musicList[id].upvote--;
    }
}

function updateMusic(music) {
    musicList[music.id].title = music.title;
    musicList[music.id].artist = music.artist;
    musicList[music.id].album = music.album;
    musicList[music.id].genre = music.genre;
}

function deleteMusic(musicId) {
    delete musicList[musicId];
}

function uploadMusic(music) {
    music.id = musicIdGenerator.next().value + '';
    music.image = 'images/' + music.album.toLowerCase().replace(/\s+/g, '-') + '.jpg';
    music.upvote = '0';
    music.providerId = music.providerId;
    music.providerName = userData[music.providerId].name;

    musicList[music.id] = music;
    console.log('   Music #' + music.id + ' has been added into list.');
}

// --- Lisener ---
app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
})