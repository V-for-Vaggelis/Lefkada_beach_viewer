import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ShowModal from './components/Modal'
import FilterOptions from './components/FilterChoices'
import scriptLoader from 'react-async-script-loader'
import beaches from './beaches.json'
import { Glyphicon, Button } from 'react-bootstrap';

class App extends Component {
  state = {
    modal: false,
    pictures: [],
    markers: [],
    map: '',
    scriptFail: false,
    place: "",
    infoWindow: ''
  }
  initMap = () => {
    let app = this;
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 38.7066464, lng: 20.640729999999962},
      zoom: 11
    });
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
      marker.addListener('click', function(e) {
        app.createInfoWindow(marker, infoWindow, map, beach);
      })
    }
    this.setState(() => ({
      markers: markers,
      map: map,
      infoWindow: infoWindow
    }))
  }

  createInfoWindow = (marker, infoWindow, map, beach) => {
    let app = this;
    let photos = [];
    if (infoWindow.marker != marker) {
      infoWindow.marker = marker;
      infoWindow.setContent(`<div> ${marker.title} <button id="photos-link"> View photos </button> </div>`);
      infoWindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      document.getElementById("photos-link").addEventListener("click", function() {
        if (typeof(Storage) && localStorage[beach.title]) {
          let links = localStorage[beach.title].split(",");
          app.setState(() => ({
            pictures: links,
            modal: true,
            place: beach.title}));
            return;
          }
          if (photos.length > 0) {
            photos = []
          }
          let link = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f97455aeea8de971ec02dc9714816d4&lat=${beach.location.lat}&lon=${beach.location.lng}&radius=0.2&radius_units=km&per_page=20&format=json&nojsoncallback=1`
          fetch(link).then(function(res) {
            res.json().then(function(parsed) {
              console.log(parsed)
              // Create flickr image link method from https://stackoverflow.com/questions/43703296/use-json-output-from-flickr-to-display-images-from-search
              let _s = parsed.photos.photo;
              for (let z = 0; z < parsed.photos.photo.length; z++)
              {
                let currentPhotoUrl = 'https://farm'+_s[z]['farm']+'.staticflickr.com/'+_s[z]['server']+'/'+_s[z]['id']+'_'+_s[z]['secret']+'_z.jpg'
                photos.push(currentPhotoUrl)
              }
              return photos;
            }).then((photos) => {
              localStorage.setItem(beach.title, photos);
              app.setState(() => ({
                pictures: photos,
                modal: true,
                place: beach.title
              }));
            });
          }
        ).catch(function(err) {
          alert("We are sorry something went wrong")
        })
      })
      infoWindow.addListener('closeclick', function() {
        infoWindow.setMarker = null;
      });
    }
  }

  hideModal = () => {
    this.setState(() => ({
      modal: false
    }))
  }

  filterLocation = (locationName) => {
    let markers = this.state.markers
    let infoWindow = this.state.infoWindow;
    let app = this;
    for (let marker of markers) {
      if (marker.title === locationName) {
        // If location was filtered out, this will show it again
        marker.setMap(this.state.map)
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(function () {
          marker.setAnimation(null);
          let beach = beaches.filter((b) => b.title === locationName)
          console.log(beach)
          app.createInfoWindow(marker, infoWindow, app.state.map, beach[0]);
        }, 600);
      }
      else {
        marker.setMap(null)
      }
    }
  }

  showAllMarkers = () => {
    for (let marker of this.state.markers) {
      marker.setMap(this.state.map)
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(function () {
        marker.setAnimation(null);
      }, 600);
    }
  }


  // Async load map idea from https://stackoverflow.com/questions/41709765/how-to-load-the-google-maps-api-script-in-my-react-app-only-when-it-is-require
  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        this.initMap()
      }
      else {
        this.state.scriptFail = true
      }
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.modal && (<ShowModal closeModal={this.hideModal} showInfo={this.state.modal} picsToRender={this.state.pictures} beach={this.state.place}/>)}
        <header>
          <Button name="Toggle" aria-label="Toggle Side Panel" className="toggle-filters">
            <Glyphicon glyph="menu-hamburger" />
          </Button>
          <h1>
            Lefkada's beach viewer
          </h1>
        </header>
        <main>
          <aside id="filter-container">
            <FilterOptions options={beaches} applyFilter={this.filterLocation} showAllBeaches={this.showAllMarkers}/>
          </aside>
          <section id="map-container">
            <div id="map" role="application" style={{height:"90vh"}}>
              {this.state.scriptFail && (
                <p id="map-fail">
                  <span id="sad-face">&#x2639;</span>
                  We are sorry the map could not load for now </p>)}
                </div>
              </section>
            </main>
            <footer>Powered by <a href="https://developers.google.com/maps/documentation/javascript/tutorial">Google maps</a> and <a href="https://www.flickr.com/">Flickr.</a></footer>
          </div>
        )
      }
    }

    export default scriptLoader(['https://maps.googleapis.com/maps/api/js?key=AIzaSyCENzVbJtz4UfWe1CN0Em6l5d7IXmNfAM8&libraries=places'])(App)
