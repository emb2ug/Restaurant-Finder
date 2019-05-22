// Evan Bernard

import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import "./Restaurants.css";
//import Map from "./Map/index.js";
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
      //names: [],
      //ratings: [],
      //prices: [],
      //dollarSigns: ""
    };
  }

  componentDidMount = () => {
    let tempRestaurants = [];
    let tempAllLatitudes = [];
    let tempAllLongitudes = [];
    let tempNames = [];
    //let tempNames = [];
    //let tempRatings = [];
    //let tempPrices = [];
    //let tempDollarSigns = [];

    let url =
      "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Charlottesville&type=%22restaurant%22&radius=20000&opennow&key=" +
      API_KEY;

    axios
      .get(url)

      .then(response => {
        response.data.results.forEach(restaurant => {
          //tempNames.push(restaurant.name);
          //tempRatings.push(restaurant.rating);
          //tempPrices.push(restaurant.price_level);

          let myString = "";
          for (let i = 0; i < restaurant.price_level; i++) {
            myString += "$";
          }
          //tempDollarSigns.push(myString);

          tempRestaurants.push({
            name: restaurant.name,
            rating: restaurant.rating,
            price: restaurant.price_level,
            dollarSigns: myString,
            latitude: restaurant.geometry.location.lat,
            longitude: restaurant.geometry.location.lng
          });

          //console.log(restaurant.geometry.location.lat);
        });

        //console.log("LAT: " + tempRestaurants[0].latitude);
        //console.log("LONG: " + tempRestaurants[0].longitude);

        tempRestaurants.sort((a, b) =>
          a.rating < b.rating
            ? 1
            : a.rating === b.rating
            ? a.price > b.price
              ? 1
              : -1
            : -1
        );

        tempRestaurants.forEach(restaurant => {
          tempAllLatitudes.push(restaurant.latitude);
          tempAllLongitudes.push(restaurant.longitude);
          tempNames.push(restaurant.name);
        });

        console.log(tempRestaurants);
        this.setState({
          restaurants: tempRestaurants,
          allLatitudes: tempAllLatitudes,
          allLongitudes: tempAllLongitudes,
          names: tempNames
          //names: tempNames,
          //ratings: tempRatings,
          //prices: tempPrices,
          //dollarSigns: tempDollarSigns
        });

        //console.log(this.state.allLatitudes);
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
                <Map
                  restaurants={this.state.restaurants}
                  lats={this.state.allLatitudes}
                  longs={this.state.allLongitudes}
                />
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Restaurants;
