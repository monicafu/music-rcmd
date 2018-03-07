// --- Initialization ---
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(bodyParser.json({extended: true, type: '*/*'}));


// --- Data ---
const musicList = require('./music.js');
const userData = {
    1: {
        id: 1,
        name: 'Justin',
        likes: []
    }, 
    2: {
        id: 2,
        name: 'Taylor',
        likes: []
    }, 
    3: {
        id: 3,
        name: 'Lauv',
        likes: []
    }
};
const idGenerator = function* (num) {
    let id = 1;
    while(true) {
        yield id;
        id = id % num + 1;
    }
    return;
}(3);

// --- Rounter ---
app.get('/getUserData', function(req, res) {
    const id = idGenerator.next().value;
    console.log(`- user${id} is browsing`);
    res.send(JSON.stringify(userData[id]));
});

/* Get all music list request */
app.post('/getMusic', function(req, res) {
    if (verifyUser(req.body)) {
        res.send(JSON.stringify(musicList));
    }
    else {
        res.send(400,'User name or password invalid.');
    }
});

/* Update votes request */
app.post('/getVotes',function(req,res) {
    // console.log(req.body);
    const id = req.body.id;
    const isLiked = req.body.isliked;
    if (id === 'error') {
        res.status(500).end();
    } else {
        updateVotes(id,isLiked);
    }
});

/* Edit request */
app.post('/getSaveData',function (req,res) {
    // console.log(req.body);
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

// --- Auxiliary functions ---
// For future use
function verifyUser(userData) {
    console.log(`- verifying user${userData.id}...`);
    return true;
}

// --- Logic of update the data on the server memory ---
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