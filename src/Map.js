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

    this.state = {
      i: 0
    };
  }

  componentDidMount = () => {
    this.map = L.map("map", {
      center: [38.04, -78.48],
      zoom: 13,
      zoomControl: true
    });

    for (let j = 0; j < this.props.lats.length; j++) {
      L.marker([this.props.lats[j], this.props.longs[j]]).addTo(this.map);
    }

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
  };

  render() {
    console.log(this.props.lats[0]);
    console.log(this.props.longs);

    console.log(this.props.lats[0]);

    return (
      <div>
        <Wrapper width="490px" height="600px" id="map" />
      </div>
    );
  }
}
