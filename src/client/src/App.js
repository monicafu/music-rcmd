import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: ''
        };
    }

    componentWillMount() {
        this.performGetRequest();
    }

    getRequest(url) {
        return fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject('error-response-not-ok');
        })
        .catch((error) => {
            if (error.toString().startsWith('error-')) {
                return Promise.reject('error-response-json-bad');
            }
        });
    }

    performGetRequest() {
        this.getRequest('/test')
        .then(json => {
            this.setState({
                response: json.express
            });
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="App">
            <h1>Test page</h1>
            <h2>{this.state.response}</h2>
            </div>
        );
    }
}

export default App;
