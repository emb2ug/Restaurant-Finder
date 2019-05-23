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

var greenIcon = new L.Icon({
  iconUrl:
    "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;

export default class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    if (this.props.userLat !== 0) {
      this.map = L.map("map", {
        center: [this.props.userLat, this.props.userLng],
        zoom: 11,
        zoomControl: true
      });
    } else {
      this.map = L.map("map", {
        center: [38.04, -78.48],
        zoom: 13,
        zoomControl: true
      });
    }

    for (let i = 0; i < this.props.lats.length; i++) {
      let restaurantMarker = L.marker([
        this.props.lats[i],
        this.props.longs[i]
      ]).addTo(this.map);
      // if (i < 5) {
      //   let restaurantMarker = L.marker(
      //     [this.props.lats[i], this.props.longs[i]],
      //     { icon: greenIcon }
      //   ).addTo(this.map);
      // }

      restaurantMarker.bindPopup(this.props.restaurants[i].name);
    }

    L.tileLayer(
      "https://maps.heigit.org/openmapsurfer/tiles/roads/webmercator/{z}/{x}/{y}.png",
      {
        maxZoom: 100,
        maxNativeZoom: 50,
        detectRetina: true
      }
    ).addTo(this.map);
  };

  render() {
    return (
      <div>
        <Wrapper width="400px" height="500px" id="map" />
      </div>
    );
  }
}
