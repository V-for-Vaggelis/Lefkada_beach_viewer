import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import MyMapComponent from './components/Map.js'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
/* global google */

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={11}
    defaultCenter={{lat: 38.7066464, lng: 20.640729999999962}}
  >
    {props.isMarkerShown && <Marker position={{lat: 38.7066464, lng: 20.640729999999962}} />}
  </GoogleMap>
))
class App extends Component {
   // ```I'm trying to make this request run```
  /*componentDidMount() {
    let geocoder = new google.maps.Geocoder()
    geocoder.geocode( { 'address': 'Egremni Leukada'}, function(results, status) {
      if (status == 'OK') {
        console.log('here result of geocoder', results);
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    })
  }*/
  render() {
    return (
      <div className="App">
        <MyMapComponent isMarkerShown={false}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCENzVbJtz4UfWe1CN0Em6l5d7IXmNfAM8&v=3.exp&libraries=places"
          loadingElement={<section style={{ height: `100%` }} />}
          containerElement={<div id="map" style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />} />
      </div>
    );
  }
}

export default App;
