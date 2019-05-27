require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 9000;

const axios = require("axios");
//app.use(axios());

const API_KEY = process.env.REACT_APP_API_KEY;

app.get("/", (req, res) => res.send("Hellooooooooooo World!"));

app.get("/getLatLong/:location", (req, res) => {
  console.log("API KEY =" + API_KEY);
  console.log("URL=" + req.params.location);
  let tempURL =
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    req.params.location +
    "&key=" +
    API_KEY;
  console.log("TEMPURL=" + tempURL);
  axios
    .get(tempURL)
    .then(response => {
      res.send(response.data.results[0].geometry.location);
    })
    .catch();
});

app.get("/getRestaurants/:type/:place/:lat/:long", (req, res) => {
  let tempURL2 =
    "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" +
    req.params.type +
    "+in+" +
    req.params.place +
    "&opennow&location=" +
    req.params.lat +
    "," +
    req.params.long +
    "&radius=20000&key=" +
    API_KEY;

  axios
    .get(tempURL2)
    .then(response => {
      res.send(response.data.results);
    })
    .catch();
});

// app.get("/allbooks/:title", (req, res) => {
//   console.log("TITLE=" + req.params.title);
//   axios
//     .get("https://www.googleapis.com/books/v1/volumes?q=" + req.params.title)
//     .then(response => {
//       res.send(response.data.items[0].volumeInfo.authors[0]);
//     });
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
