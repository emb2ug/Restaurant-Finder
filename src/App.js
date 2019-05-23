import React, { Component } from "react";
import "./App.css";
import Restaurants from "./Restaurants.js";
import "leaflet/dist/leaflet.css";
import SearchBar from "./SearchBar.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <Restaurants /> */}

          <container className="mycontainer">
            <h2>Restaurant Finder</h2>

            <SearchBar />
          </container>
        </header>
      </div>
    );
  }
}

export default App;
