const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT  = 3000;

const data = require('./songs.js');
let songList = data.songsList;

app.use(bodyParser.json());
app.use('',express.static('public'));


/*get all songs list request*/
app.get('/getMusic', function(req, res) {
    res.send(JSON.stringify(songList));
});

/* update votes request */
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

/*edit request*/
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
        updateSong(data);
    }
});


/*delete request*/
app.post('/getDeleteData',function (req,res){
   console.log(req.body);
    if (id === 'error') {
        res.status(500).end();
    } else {
        deleteSong(id);
    }
});

/*logic of update the data on the server memory*/
function updateVotes(songId,isLiked) {
    if (isLiked){
        songList[songId].upvotes += 1;
    }else{
        songList[songId].upvotes -= 1;
    }
    console.log(`songId is ${songList[songId].id} and votes now is ${songList[songId].upvotes}`);
}

function updateSong(song) {
    for (let i in songList){
        if (songList[i].id === song.id){
            songList[i] = {
              "id": song.id,
              "title": song.title,
              "artist": song.artist,
              "album": song.album,
              "image": songList[i].image,
              "genre": song.genre,
              "upvotes": songList[i].upvotes
            }
        }
        break;
    }
    console.log(`now the song info is ${songList[song.id].title},
    ${songList[song.id].artist},${songList[song.id].album},${songList[song.id].genre}`);
    console.log(songList);
}

function deleteSong(songId) {
    delete songList[songId];
    console.log(`the song is deleted,
    so check ${songList[songId].id} is mapping to ${songList[songId].title}`);
    console.log(songList);
}

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
