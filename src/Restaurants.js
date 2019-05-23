import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "./Restaurants.css";
import Map from "./Map.js";

const API_KEY = process.env.REACT_APP_API_KEY;

class Restaurants extends Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: [],
      allLatitudes: [],
      allLongitudes: [],
      names: []
    };
  }

  componentDidMount = () => {
    let tempRestaurants = [];
    let tempAllLatitudes = [];
    let tempAllLongitudes = [];
    let tempNames = [];

    console.log(this.props.searchText);

    let url =
      "https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
      //restaurants+in+Charlottesville
      this.props.searchText +
      "&type=%22restaurant%22&radius=20000&opennow&key=" +
      API_KEY;

    axios
      .get(url)

      .then(response => {
        response.data.results.forEach(restaurant => {
          let myString = "";
          for (let i = 0; i < restaurant.price_level; i++) {
            myString += "$";
          }

          tempRestaurants.push({
            name: restaurant.name,
            rating: restaurant.rating,
            price: restaurant.price_level,
            dollarSigns: myString,
            latitude: restaurant.geometry.location.lat,
            longitude: restaurant.geometry.location.lng
          });
        });

        tempRestaurants.sort((a, b) =>
          a.rating < b.rating
            ? 1
            : a.rating === b.rating
            ? a.price > b.price
              ? 1
              : -1
            : -1
        );

        // Sort restaurants by rating (high to low)
        // Tiebreaker is price level (low to hight)
        tempRestaurants.forEach(restaurant => {
          tempAllLatitudes.push(restaurant.latitude);
          tempAllLongitudes.push(restaurant.longitude);
          tempNames.push(restaurant.name);
        });

        this.setState({
          restaurants: tempRestaurants,
          allLatitudes: tempAllLatitudes,
          allLongitudes: tempAllLongitudes,
          names: tempNames
        });
      });
  };

  // Bootstrap for table columns
  render() {
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
          integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
          crossOrigin="anonymous"
        />

        <header className="App-header">
          <h2>Charlottesville Restaurants</h2>

          <div className="container">
            <div className="row justify-content-left">
              <div className="col-md-auto">
                <ol>
                  {this.state.restaurants.map(restaurant => {
                    return <li>{restaurant.name}</li>;
                  })}
                </ol>
              </div>
              <div className="col-md-auto">
                {this.state.restaurants.map(restaurant => {
                  return <li className="myList">{restaurant.rating}/5</li>;
                })}
              </div>
              <div className="col-md-auto">
                {this.state.restaurants.map(restaurant => {
                  return <li className="myList">{restaurant.dollarSigns}</li>;
                })}
              </div>
              <div className="col-md-auto">
                {/*Only create instance of map if props (lats and longs) are ready to be passed into Map*/}
                {this.state.allLatitudes.length != 0 ? (
                  <Map
                    restaurants={this.state.restaurants}
                    lats={this.state.allLatitudes}
                    longs={this.state.allLongitudes}
                  />
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Restaurants;
