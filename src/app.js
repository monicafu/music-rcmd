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

/* update upvotes request,add upvotes and send back  */
app.post('/getVotes',function(req,res) {
    console.log(req.body);
    let id = req.body.id;
    let isLiked = req.body.isliked;
    updateVotes(id,isLiked);
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
    updateSong(data);
});


/*delete request*/
app.post('/getDeleteData',function (req,res){
   console.log(req.body.id);
   const id = req.body.id;
   deleteSong(id);
   //res.json(songList);
});

/*logic of update the data*/
function updateVotes(songId,isLiked) {
    if (isLiked){
        songList[songId-1].upvotes += 1;
    }else{
        songList[songId-1].upvotes -= 1;
    }
    console.log(`songId is ${songList[songId-1].id} and votes now is ${songList[songId-1].upvotes}`);
}

function updateSong(song) {
    for (let i in songList){
        if (songList[i].id === song.id){
            songList[i].title = song.title;
            songList[i].artist = song.artist;
            songList[i].album = song.album;
            songList[i].genre = song.genre;
            console.log(`now the song info is ${songList[song.id-1].title},
    ${songList[song.id-1].artist},${songList[song.id-1].album},${songList[song.id-1].genre}`);
        }
        break;
    }
    
}

function deleteSong(songId) {
    console.log(`deleted song is ${songList[songId-1].id},title is ${songList[songId-1].title}`);
    songList.splice(songId-1,1);
    //delete songList[songId-1];
    console.log(`after delete ${songList[songId-1].id},title is ${songList[songId-1].title}`);    
}

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});