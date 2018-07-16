import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ShowModal from './components/Modal'
import FilterOptions from './components/FilterChoices'

const beaches = [{title: 'Kathisma', location: {lat: 38.7767939, lng: 20.600207599999976}},
{title: 'Egremni', location: {lat: 38.6374903, lng: 20.558387700000026}},
{title: 'Porto-katsiki', location: {lat: 38.6011744, lng: 20.55033739999999}},
{title: 'Vasiliki beach', location: {lat: 38.6286429, lng: 20.606477799999993}},
{title: 'Agios Nikitas', location: {lat: 38.790081, lng: 20.613406}}
];

class App extends Component {
  state = {
    modal: false,
    pictures: [],
    markers: [],
    map: ''
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
      map: map
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

              // console.log(currentPhotoUrl)
              let pic = {alt: `A photo of ${marker.title} in Lefkada`, url: currentPhotoUrl}
              photos.push(pic)
            }
          }).then(() =>
          this.setState(() => ({
            pictures: photos,
            modal: true
          }))
        );
      }.bind(app)
    ).catch(function(err) {
      console.log(err)
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
  let infoWindow = new window.google.maps.InfoWindow();
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

componentDidMount() {
  this.initMap()
}
render() {
  return (
    <div className="App">
      {this.state.modal === true && (<ShowModal closeModal={this.hideModal} showInfo={this.state.modal} picsToRender={this.state.pictures}/>)}
      <main>
        <aside id="filter-container">
          <FilterOptions options={beaches} applyFilter={this.filterLocation}/>
        </aside>
        <section id="map-container">
          <div id="map" role="application" style={{height:"100vh"}}>
          </div>
        </section>
      </main>
    </div>
  )
}
}

export default App;
