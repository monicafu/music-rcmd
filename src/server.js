// --- Initialization ---
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(bodyParser.json({extended: true, type: '*/*'}));


// --- Data ---
let musicList = require('./music.js');
let userData = require('./user.js');
const idGenerator = function* (num) {
    let id = 1;
    while(true) {
        yield id;
        id = id % num + 1;
    }
    return;
}(3);


// --- Services functions ---
const {verifyUser} = require('./service.js');


// --- Rounter ---
/* Get user request */
app.get('/getUserData', function(req, res) {
    const id = idGenerator.next().value;
    console.log(`-- user${id} is browsing`);
    res.status(200).send( JSON.stringify(userData[id]) );
});

/* Get music list request */
app.post('/getMusic', function(req, res) {
    const data = req.body;

    if (verifyUser(data)) {
        res.status(200).send( JSON.stringify(musicList) );
    }
    else {
        res.status(400).send( {"msg": "user-name-or-password-invalid" } );
    }
});

/* Update votes request */
app.post('/updateUpvote', function(req, res) {
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
app.post('/updateMusic', function (req, res) {
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
app.post('/deleteMusic',function (req, res){
    const data = req.body;
    console.log(' * Delete music ' + data.id);

    if (data.id === 'error') {
        res.status(500).send( {"msg": "delete-music-fails"} );
    } else {
        deleteMusic(data.id);
        res.status(200).send( {"msg": "delete-music-succeeds"} );
    }
})


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

// --- Lisener ---
app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
})