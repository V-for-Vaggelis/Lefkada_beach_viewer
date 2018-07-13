import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 38.7066464, lng: 20.640729999999962},
      zoom: 11
    });
    let beaches = [{title: 'Kathisma', location: {lat: 38.7767939, lng: 20.600207599999976}},
    {title: 'Egremni', location: {lat: 38.6374903, lng: 20.558387700000026}},
    {title: 'Porto-katsiki', location: {lat: 38.6011744, lng: 20.55033739999999}},
    {title: 'Vasiliki beach', location: {lat: 38.6286429, lng: 20.606477799999993}},
    {title: 'Agios Nikitas', location: {lat: 38.790081, lng: 20.613406}}
  ];
  let markers = [];
  let infoWindow = new window.google.maps.InfoWindow();
  for (let beach of beaches) {
    let marker = new window.google.maps.Marker({
      position: beach.location,
      map: map,
      title: beach.title,
      // Create a drop marker effect
      animation: window.google.maps.Animation.DROP
    });
    markers.push(marker);
    marker.addListener('click', function() {
      if (infoWindow.marker != marker) {
        infoWindow.marker = marker;
        infoWindow.setContent(`<div> ${marker.title} <button id="photos-link"> View photos </button> </div>`);
        infoWindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        document.getElementById("photos-link").addEventListener("click", function() {
          console.log("clicked")
        })
        infoWindow.addListener('closeclick', function() {
          infoWindow.setMarker = null;
        });
      }
    });
  }
}
showPhotos = () => {
  console.log("click")
}
componentDidMount() {
  this.initMap()
}
render() {
  return (
    <div className="App">
      <section id="map-container">
        <div id="map" role="application" style={{height:"100vh"}}>
        </div>
      </section>
    </div>
  );
}
}

export default App;
