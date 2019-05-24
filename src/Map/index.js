/* NOT USING */

import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    console.log("a");
    console.log(props.lats);
    console.log("b");
  }

  componentDidMount = () => {
    this.map = L.map("map", {
      center: [38.04, -78.48],
      zoom: 13,
      zoomControl: true
    });

    /*
    L.tileLayer(
      "https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png",
      {
        maxZoom: 100,
        maxNativeZoom: 50,
        detectRetina: true
      }
    ).addTo(this.map);

    L.marker([38.04, -78.48]).addTo(this.map);

    var circle = L.circle([38.04, -78.48], {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 10
    }).addTo(this.map);
*/
    // var popup = L.popup()
    //   .setLatLng([38.04, -78.48])
    //   .setContent("I am a standalone popup.")
    //   .openOn(this.map);

    // if (this.props.lats.length > 0) {
    //   console.log(this.props.lats);
    //   for (let i = 0; i < this.props.lats.length; i++) {
    //     //L.marker([this.props.lats[i], this.props.longs[i]]).addTo(this.map);
    //     var popup = L.popup()
    //       .setLatLng([this.props.lats[i], this.props.longs[i]])
    //       .setContent("I am a standalone popup.")
    //       .openOn(this.map);
    //   }
    // }
  };

  render() {
    const LeafletMarkers = this.props.restaurants.map(restaurant => (
      <L.Marker
        position={[restaurant.latitude, restaurant.longitude]}
        key={`marker_${restaurant.name}`}
      >
        <L.Popup>
          <span>{restaurant.name}</span>
        </L.Popup>
      </L.Marker>
    ));

    return (
      <div>
        <div className="map">
          <L.Map
            center={[38.04, -78.48]}
            zoom={13}
            zoomControl={true}
            //className="map__reactleaflet"
          >
            <L.TileLayer
              url="https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png"
              //attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
            />
            {LeafletMarkers}
          </L.Map>
        </div>

        {/* {console.log("h")}
        {console.log(this.props.lats)}
        {<h1>{this.props.lats[2]}</h1>}
        {console.log(this.props.lats[2])}
        {console.log(this.props.longs[2])}
        L.marker([this.props.lats[2], this.props.longs[2]]).addTo(this.map)*/}
        {/*Object.keys(this.props.restaurants).map(restaurant =>
          L.marker([restaurant.latitude, restaurant.longitude]).addTo(this.map)
        )*/}

        {/*L.marker([
          this.props.restaurants[0].latitude,
          this.props.restaurants[0].longitude
        ]).addTo(this.map)*/}

        <Wrapper width="490px" height="600px" id="map" />
      </div>
    );
  }
}
