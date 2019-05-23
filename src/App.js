import React, { Component } from "react";
import "./App.css";
import Restaurants from "./Restaurants.js";
import "leaflet/dist/leaflet.css";
import UserInput from "./UserInput.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="App">
        {/*<Restaurants />*/}
        <UserInput />
      </div>
    );
  }
}

export default App;
