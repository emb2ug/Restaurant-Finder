import React, { Component } from "react";
import "./App.css";
import Restaurants from "./Restaurants.js";

const API_KEY = process.env.REACT_APP_API_KEY;

class UserInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: ""
    };
  }

  componentDidMount = () => {};

  //   clicked() {
  //     if (!this.state.submitted) {
  //       this.setState({
  //         submitted: true
  //       });
  //       this.formData();
  //     }
  //   }

  //   formData() {
  //     if (this.state.submitted) {
  //       let userInputText = document.getElementById("searchInput").value;
  //       console.log(userInputText);
  //     }
  //   }

  getInput = () => {
    let userInput = document.getElementById("searchInput").value;
    this.setState({
      searchText: userInput
    });
    console.log(userInput);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p />
          <form>
            <input type="text" id="searchInput" />
            <input
              type="submit"
              value="Search"
              onClick={() => this.getInput()}
            />
          </form>
          <br />
          {this.state.searchText.length !== 0 ? (
            <Restaurants searchText={this.state.searchText} />
          ) : (
            <div />
          )}
        </header>
      </div>
    );
  }
}

export default UserInput;
