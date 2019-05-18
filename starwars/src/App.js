import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            starwarsChars: []
        };
        this.getCharacters = this.getCharacters.bind(this);
        this.goToNextPage = this.goToNextPage.bind(this);
        this.goToPreviousPage = this.goToPreviousPage.bind(this);
    }

    componentDidMount() {
        this.getCharacters('https://swapi.co/api/people/');
    }

    getCharacters(URL) {
        // feel free to research what this code is doing.
        // At a high level we are calling an API to fetch some starwars data from the open web.
        // We then take that data and resolve it our state.
        fetch(URL)
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                this.setState({ starwarsChars: data.results, next: data.next, previous: data.previous });
            })
            .catch(err => {
                throw new Error(err);
            });
    };

    goToNextPage(event) {
        if (this.state.next !== null) {
            this.getCharacters(this.state.next);
        }
    }

    goToPreviousPage(event) {
        if (this.state.previous !== null) {
            this.getCharacters(this.state.previous);
        }
    }

    render() {
        return (
            <div className="App">
                <h1 className="Header">React Wars</h1>
                <ul className="CharacterList">
                    {this.state.starwarsChars.map(char => <li className="Character" key={char.name}>{char.name}</li>)}
                </ul>
                <button onClick={this.goToNextPage}>Next</button>
                <button onClick={this.goToPreviousPage}>Previous</button>
            </div>
        );
    }
}

export default App;
