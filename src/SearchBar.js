import React, { Component } from "react";
import "./App.css";
import Restaurants from "./Restaurants.js";
import Map from "./Map.js";

const API_KEY = process.env.REACT_APP_API_KEY;

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
      isAnAddress: false
    };
  }

  componentDidMount = () => {};

  getInput = () => {
    let userInput = document.getElementById("searchInput").value;
    this.setState({
      searchText: userInput,
      isAnAddress: false
    });
    console.log(userInput);
  };

  addressSearch = () => {
    let userInput = document.getElementById("searchInput").value;
    this.setState({
      searchText: userInput,
      isAnAddress: true
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <input
            type="text"
            height="50"
            width="200"
            placeholder="Search here!"
            id="searchInput"
          />
          <input
            type="submit"
            value="Search by Category"
            onClick={() => this.getInput()}
          />
          <input
            type="submit"
            value="Search by Address"
            onClick={() => this.addressSearch()}
          />

          {this.state.searchText.length !== 0 ? (
            <Restaurants
              searchText={this.state.searchText}
              isAnAddress={this.state.isAnAddress}
            />
          ) : (
            <div />
          )}
        </header>
      </div>
    );
  }
}

export default SearchBar;
