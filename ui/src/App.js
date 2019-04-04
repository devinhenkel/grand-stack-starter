import React, { Component } from "react";
import "./App.css";
//import UserList from "./UserList";
import MovieList from "./MovieList";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img
            src={process.env.PUBLIC_URL + "/img/filmstrip.png"}
            className="App-logo"
            alt="logo"
          />
          <h1 className="App-title">Movies, movies, movies!</h1>
        </header>
        <div>Movies:</div>
        <MovieList />
      </div>
    );
  }
}

export default App;
