import React, {Component} from 'react';

// Components imported here
import Header from './Header';
import Navigation from './Navigation';
import Music from './Music';

// Services functions
import {callGetRequest, callPostRequest} from './script/services.js';
import {objToArr, getGenre, sort, search, postUpvote, postSave, postDelete} from './script/functions.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	userData: {},
        	musicList: {},
            renderBuff: [],
            searchContent: null,
            currentGenre: 'All'
        };

        this.switchGenre = this.switchGenre.bind(this);
        this.updateRenderBuff = this.updateRenderBuff.bind(this);
        this.sortRenderBuff = this.sortRenderBuff.bind(this);
        this.updateSearchContent = this.updateSearchContent.bind(this);
        this.clearSearchContent = this.clearSearchContent.bind(this);
        this.upvoteMusic = this.upvoteMusic.bind(this);
        this.saveMusic = this.saveMusic.bind(this);
        this.deleteMusic = this.deleteMusic.bind(this);
        this.uploadMusic = this.uploadMusic.bind(this);
    }

    async componentDidMount() {
        try {
            const userData = await callGetRequest('/getUserData');
            const musicList = await callPostRequest('/getMusic', {id: userData.id} );
            const renderBuff = objToArr(musicList);
            await this.setState({
                userData,
                musicList,
                renderBuff
            });
        }
        catch(error) {
            console.log(error);
        }
    }

    // --- Filter ---

    switchGenre(genre) {
        this.setState({
            currentGenre: genre,
        });
        this.updateRenderBuff(getGenre(genre, this.state.musicList));
        this.clearSearchContent();
    }

    // --- Render ---

    updateRenderBuff(items) {
        this.setState({
            renderBuff: items
        });
    }

    sortRenderBuff(ifLoToHi) {
        const list = sort(this.state.renderBuff, ifLoToHi);
        this.updateRenderBuff(list);
    }

    // --- Search ---

    updateSearchContent(content) {
        this.setState({
            searchContent: content
        });
        const list = search(content, getGenre(this.state.currentGenre, this.state.musicList));
        this.updateRenderBuff(list);
    }

    clearSearchContent() {
        this.setState({
            searchContent: null
        });
    }

    // --- Upvote ---
    upvoteMusic(musicId) {
        let musicList = this.state.musicList;
        let userData = this.state.userData;
        console.log(musicId);

        for (let i in musicList) {
            if (i === musicId) {
                let index = userData.like.indexOf(musicId);
                if (index < 0) {
                    musicList[i].upvote++;
                    userData.like.push(musicId);
                    postUpvote(musicId, true, userData.id);
                } else {
                    musicList[i].upvote--;
                    userData.like.splice(index, 1);
                    postUpvote(musicId, false, userData.id);
                }
            }
        }

        this.setState({
            musicList,
            userData,
        });
        this.updateRenderBuff(getGenre(this.state.currentGenre, musicList));
    }

    // --- Edit ---
    saveMusic(musicId) {
        const editTitle = document.querySelector('#title-edit');
        const editArtist = document.querySelector('#artist-edit');
        const editAlbum = document.querySelector('#album-edit');
        const editGenre = document.querySelector('#genre-edit');

        let musicList = this.state.musicList;

        for (let i in musicList) {
            if (i === musicId) {
                if (editTitle.value) {
                    musicList[i].title = editTitle.value;
                }
                if (editArtist.value) {
                    musicList[i].artist = editArtist.value;
                }
                if (editAlbum.value) {
                    musicList[i].album = editAlbum.value;
                }
                musicList[i].genre = editGenre.value;
                postSave(musicList[i]);
            }
        }

        this.setState({
            musicList
        });
        this.updateRenderBuff(getGenre(this.state.currentGenre, musicList));
    }

    // --- Delete ---
    deleteMusic(musicId) {
        let musicList = this.state.musicList;
        postDelete(musicId);
        delete musicList[musicId];

        this.setState({
            musicList
        });
        this.updateRenderBuff(getGenre(this.state.currentGenre, musicList));
    }

    // --- Upload ---
    async uploadMusic(newMusic) {
        let data = new FormData();
        data.append('title', newMusic.title);
        data.append('artist', newMusic.artist);
        data.append('album', newMusic.album);
        data.append('genre', newMusic.genre);
        data.append('providerId', this.state.userData.id);
        data.append('image', newMusic.image);

        try {
            const musicList = await callPostRequest('/uploadMusic', data);

            this.setState({
                musicList
            });
            this.updateRenderBuff(getGenre(this.state.currentGenre, musicList));
        }
        catch(error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="App">
            	<Header userData={this.state.userData}
                        searchContent={this.state.searchContent} 
                        onSearch={this.updateSearchContent} />
                <Navigation currentGenre={this.state.currentGenre} onGenreChange={this.switchGenre} />
                <Music musicList={this.state.musicList}
                       renderBuff={this.state.renderBuff}
                       userData={this.state.userData}
                       currentGenre={this.state.currentGenre}
                       searchContent={this.state.searchContent} 
                       onOrderChange={this.sortRenderBuff}
                       onUpvote={this.upvoteMusic}
                       onSave={this.saveMusic}
                       onDelete={this.deleteMusic}
                       onUpload={this.uploadMusic} />
            </div>
        );
    }
}

export default App;