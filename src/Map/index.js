import React from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";

const Wrapper = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
`;

export default class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    console.log("LATS IN PROPS:");
    console.log(this.props.lats);
    this.map = L.map("map", {
      center: [38.04, -78.48],
      zoom: 13,
      zoomControl: true
    });

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

    var popup = L.popup()
      .setLatLng([38.04, -78.48])
      .setContent("I am a standalone popup.")
      .openOn(this.map);

    /*
    if (this.props.lats.length > 0) {
      console.log(this.props.lats);
      for (let i = 0; i < this.props.lats.length; i++) {
        L.marker([this.props.lats[i], this.props.longs[i]]).addTo(this.map);
      }
    }
    */
  };

  render() {
    return (
      <div>
        <p />
        <Wrapper width="502px" height="600px" id="map" />
      </div>
    );
  }
}
