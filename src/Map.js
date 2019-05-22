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
  }

  componentDidMount = () => {
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

    // var popup = L.popup()
    //   .setLatLng([38.04, -78.48])
    //   .setContent("I am a standalone popup.")
    //   .openOn(this.map);
  };

  render() {
    console.log(this.props.lats);
    console.log(this.props.longs);

    //L.marker([this.props.lats[0], this.props.longs[0]]).addTo(this.map);

    return (
      <div>
        {/* {L.marker([this.props.lats[0], this.props.longs[0]]).addTo(this.map)} */}
        {/*}
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
        */}
        {/*L.marker([
          this.props.restaurants[0].latitude,
          this.props.restaurants[0].longitude
        ]).addTo(this.map)*/}
        <Wrapper width="490px" height="600px" id="map" />
      </div>
    );
  }
}
