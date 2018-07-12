import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 38.7066464, lng: 20.640729999999962},
      zoom: 11
    });
  }
  componentDidMount() {
    this.initMap()
  }
  render() {
    return (
      <div className="App">
        <div id="map" style={{height:"100vh"}}>
        </div>
      </div>
    );
  }
}

export default App;
