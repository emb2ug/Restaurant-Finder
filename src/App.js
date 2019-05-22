import React, { Component } from "react";
import "./App.css";
import Restaurants from "./Restaurants.js";
import Map from "./Map";
import "leaflet/dist/leaflet.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Restaurants />

        {/*<Map />*/}
      </div>
    );
  }
}

export default App;
