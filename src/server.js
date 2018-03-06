// --- Initialization ---
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use('',express.static('public'));


// --- Data ---
const musiclist = require('./music.js');


// --- Rounter ---
/* Get all music list request */
app.get('/getMusic', function(req, res) {
    res.send(JSON.stringify(musiclist));
});

/* Update votes request */
app.post('/getVotes',function(req,res) {
    console.log(req.body);
    let id = req.body.id;
    let isLiked = req.body.isliked;
    if (id === 'error') {
        res.status(500).end();
    } else {
        updateVotes(id,isLiked);
    }
});

/* Edit request */
app.post('/getSaveData',function (req,res) {
    console.log(req.body);
    const data = {
       id : req.body.id,
       title : req.body.title,
       artist : req.body.artist,
       album : req.body.album,
       genre : req.body.genre
    };

    if (data.id === 'error') {
        res.status(500).end();
    } else {
        updateMusic(data);
    }
});

/* Logic of update the data on the server memory */
function updateVotes(musicId,isLiked) {
    if (isLiked){
        musiclist[musicId].upvotes += 1;
    }else{
        musiclist[musicId].upvotes -= 1;
    }
    //console.log(`musicId is ${musiclist[musicId].id} and votes now is ${musiclist[musicId].upvotes}`);
}

function updateMusic(music) {
    musiclist[music.id].title = music.title;
    musiclist[music.id].artist = music.artist;
    musiclist[music.id].album = music.album;
    musiclist[music.id].genre = music.genre;
    //console.log(musiclist);
}

function deleteMusic(musicId) {
    delete musiclist[musicId];
    //console.log(musiclist);
}

/* Test */
app.get('/test', function(req, res) {
	res.send({
		express: "Hello from express"
	});
});


// --- Lisener ---
app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
})