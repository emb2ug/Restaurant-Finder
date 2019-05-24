import React, { Component } from "react";
import "./App.css";
import "./SearchBar.css";
import Restaurants from "./Restaurants.js";
import Button from "@material-ui/core/Button";
import blueGrey from "@material-ui/core/colors/blueGrey";

const buttonColor = blueGrey[200];
const API_KEY = process.env.REACT_APP_API_KEY;

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchType: "",
      searchPlace: "",
      isAnAddress: false,
      clicked: false
    };
  }

  componentDidMount = () => {};

  getType = () => {
    let tempType = document.getElementById("typeInput").value;
    this.setState({
      searchType: tempType,
      clicked: true
    });
    console.log(tempType);
  };

  getPlace = () => {
    let tempPlace = document.getElementById("placeInput").value;
    this.setState({
      searchPlace: tempPlace,
      clicked: true
    });
    console.log(tempPlace);
  };

  getTypeAndPlace = () => {
    this.getType();
    this.getPlace();
  };

  revertChange = () => {
    this.setState({
      clicked: false
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <container className="searchBar">
            <div className="item">
              <input
                className="myInput"
                type="text"
                height="50"
                width="200"
                placeholder="What kind of food are you looking for?"
                id="typeInput"
              />
            </div>
            <div>
              <p>in</p>
            </div>
            <div className="item">
              <input
                className="myInput"
                type="text"
                height="50"
                width="200"
                placeholder="Where would you like to search?"
                id="placeInput"
              />
            </div>
            <div className="item">
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.getTypeAndPlace()}
              >
                Search
              </Button>
            </div>
          </container>

          {this.state.searchPlace.length !== 0 ? (
            <Restaurants
              clicked={this.state.clicked}
              revertChange={this.revertChange}
              searchType={this.state.searchType}
              searchPlace={this.state.searchPlace}
            />
          ) : (
            <div>
              <br />
              <img
                height="364"
                width="371"
                src="http://images.clipartpanda.com/restaurant-clipart-Restaurant-Sign-Black.png"
              />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default SearchBar;
