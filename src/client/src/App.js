import React, { Component } from 'react';
// import './App.css';

// Components imported here
import Header from './Header';

// Services functions
import {callGetRequest, callPostRequest} from './services.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	userData: {},
        	musicList: {},
            renderBuff: [],
            currentGenre: 'All',
            currentIdPopup: 1
        };
    }

    componentWillMount() {
    	callGetRequest('/getUserData')
    	.then( userData => {
    		this.setState( {userData} );
    		callPostRequest('/getMusic', userData)
    		.then()	
    	})
    	
    }

    loadData = async () => {
    	const userData = await callGetRequest('/getUserData');
    	const musicList = await callPostRequest('/getMusic');
    }



    render() {
        return (
            <div className="App">
            	<Header user={this.state.userData} />
            </div>
        );
    }
}

export default App;
