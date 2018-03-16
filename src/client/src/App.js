import React, { Component } from 'react';

// Components imported here
import Header from './Header';
import Navigation from './Navigation';

// Services functions
import {callGetRequest, callPostRequest} from './script/services.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	userData: {},
        	musicList: {},
            renderBuff: [],
            currentGenre: 'All'
        };
    }

    async componentDidMount() {
        try {
            const userData = await callGetRequest('/getUserData');
            const musicList = await callPostRequest('/getMusic', {id: userData.id} );
            await this.setState({
                userData,
                musicList
            });
        }
        catch(error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="App">
            	<Header userData={this.state.userData} />
                <Navigation />
            </div>
        );
    }
}

export default App;
