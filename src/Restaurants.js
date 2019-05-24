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
      names: [],
      userLat: 0,
      userLng: 0,
      restaurantsUpdated: false
    };
  }

  componentDidMount = () => {
    this.getRestaurants();
  };

  getRestaurants = () => {
    let mySearchText = this.props.searchText;
    let tempRestaurants = [];
    let tempAllLatitudes = [];
    let tempAllLongitudes = [];
    let tempNames = [];
    let url = "";

    console.log(this.props.searchText);

    /* Geocoding */
    if (this.props.searchType.length > 0 && this.props.searchPlace.length > 0) {
      console.log("gothereaddress");
      let geoURL =
        "https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?address=" +
        this.props.searchPlace +
        "&key=" +
        API_KEY;
      console.log(geoURL);
      let geoLat = 0;
      let geoLng = 0;

      axios
        .get(geoURL)

        .then(geoResponse => {
          geoLat = geoResponse.data.results[0].geometry.location.lat;

          geoLng = geoResponse.data.results[0].geometry.location.lng;
          console.log(geoLat);
          console.log(geoLng);

          this.setState({
            userLat: geoResponse.data.results[0].geometry.location.lat,
            userLng: geoResponse.data.results[0].geometry.location.lng
          });
        })

        .then(rep => {
          let secondGeoURL =
            "https://cors-anywhere-hclaunch.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
            this.props.searchType +
            "+in+" +
            this.props.searchPlace +
            "&opennow&location=" +
            geoLat +
            "," +
            geoLng +
            "&radius=20000&key=" +
            API_KEY;

          console.log(secondGeoURL);

          axios.get(secondGeoURL).then(response => {
            console.log(response);
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
              names: tempNames,
              restaurantsUpdated: true
            });
          });
        });
    }
  };

  revertMapChange = () => {
    this.setState({
      restaurantsUpdated: false
    });
  };

  // Bootstrap for table columns
  render() {
    console.log("GEOLAT");
    console.log(this.state.userLat);

    if (this.props.clicked) {
      this.getRestaurants();
      this.props.revertChange();
    }

    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
          integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
          crossOrigin="anonymous"
        />

        <header className="App-header">
          <h4>
            {'Results for "' +
              this.props.searchType +
              " in " +
              this.props.searchPlace +
              '"'}
          </h4>

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
                    userLat={this.state.userLat}
                    userLng={this.state.userLng}
                    restaurantsUpdated={this.state.restaurantsUpdated}
                    revertMapChange={this.revertMapChange}
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
