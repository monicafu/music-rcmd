import React, { Component } from 'react';

// Components imported here
import Header from './Header';
import Navigation from './Navigation';

// Services functions
import {callGetRequest, callPostRequest} from './script/services.js';
import {objToArr,getGenre} from "./script/functions";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	userData: {},
        	musicList: {},
            renderBuff: [],
            currentGenre: 'All'
        };
        this.changeGenre = this.changeGenre.bind(this);
        this.updateRenderBuff = this.updateRenderBuff.bind(this);
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

    changeGenre(genre){
        this.setState({
            currentGenre:genre
        });
        this.updateRenderBuff(getGenre(genre, this.state.musicList));
    }

    updateRenderBuff(items){
        this.setState({
            renderBuff:items
        });
    }

    render() {
        return (
            <div className="App">
            	<Header userData={this.state.userData} />
                <Navigation currentGenre = {this.state.currentGenre} onGenreChange = {this.changeGenre}/>
            </div>
        );
    }
}

export default App;
