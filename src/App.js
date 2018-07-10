import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyMapComponent from './Map.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyMapComponent isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCENzVbJtz4UfWe1CN0Em6l5d7IXmNfAM8&libraries=places"
          loadingElement={<section style={{ height: `100%` }} />}
          containerElement={<div id="map" style={{ height: `100vh` }} />}
          mapElement={<div style={{ height: `100%` }} />} />
      </div>
    );
  }
}

export default App;
