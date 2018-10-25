import React, { Component } from "react";
import "./App.css";
import Movies from "./components/movies";
import NavBar from "./components/navbar";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <main role="main" className="container">
          <Movies />
        </main>
      </div>
    );
  }
}

export default App;
