import React, { Component } from "react";
import "./App.css";
import "./SearchBar.css";
import Restaurants from "./Restaurants.js";
import Map from "./Map.js";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import blueGrey from "@material-ui/core/colors/blueGrey";

const buttonColor = blueGrey[200];
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
          <container>
            <input
              type="text"
              height="50"
              width="200"
              placeholder="Search here!"
              id="searchInput"
            />

            <Button
              variant="contained"
              color="primary"
              onClick={() => this.getInput()}
            >
              Search By Category
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => this.addressSearch()}
            >
              Search By Address
            </Button>

            {/* <input
              type="submit"
              value="Search by Address"
              onClick={() => this.addressSearch()}
            /> */}
          </container>

          {this.state.searchText.length !== 0 ? (
            <Restaurants
              searchText={this.state.searchText}
              isAnAddress={this.state.isAnAddress}
            />
          ) : (
            <div>
              <br />
              <img
                height="300"
                width="300"
                src="http://images.clipartpanda.com/restaurant-clipart-Restaurant-Sign-Black.png"
              />
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default SearchBar;
