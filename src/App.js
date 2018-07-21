import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import ShowModal from './components/Modal'
import FilterOptions from './components/FilterChoices'
import scriptLoader from 'react-async-script-loader'
import beaches from './beaches.json'
import { Glyphicon, Button } from 'react-bootstrap';
import beachIcon from './beach.png'
import { Route, Link } from 'react-router-dom'

class App extends Component {
  state = {
    pictures: [],
    markers: [],
    map: '',
    scriptFail: false,
    place: "",
    infoWindow: '',
    showAside: false
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
        icon: beachIcon,
        // Create a drop marker effect
        animation: window.google.maps.Animation.DROP
      });
      markers.push(marker);
      marker.addListener('click', function(e) {
        app.setState(() => ({
          place: beach.title
        }))
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(function () {
          marker.setAnimation(null);
        app.renderInfoWindow(marker, infoWindow, beach, map);
      }, 600)
      })
    }
    this.setState(() => ({
      markers: markers,
      map: map,
      infoWindow: infoWindow
    }))
  }

  renderInfoWindow = (marker, infoWindow, beach, map) => {
    let app = this;
    let service = new window.google.maps.places.PlacesService(map);
    service.getDetails({
      placeId: beach.placeId
    }, function(place, status) {
      // If request fails, place will be falsy, butr we'll check for that in the function that creates the infoWindow
      app.fillInfoWindow(marker, infoWindow, beach, map, place)
    }
  )

}

fillInfoWindow = (marker, infoWindow, beach, map, place) => {
  let app = this;
  let photos = [];
  if (infoWindow.marker !== marker) {
    infoWindow.marker = marker;
    let innerHtml = '<div><h4>' + beach.title + '</h4>';
    // Check if the getDetails request has returned valid response
    if (place) {
      if (place.photos) {
        innerHtml += '<br><br><img alt="a photo of ' + beach.title + '" src="' + place.photos[0].getUrl(
          {maxHeight: 200, maxWidth: 200}) + '">';
        }
        if (place.rating) {
          innerHtml += '<br><br>Rating: <strong>' + place.rating + '/5</strong>'
        }
      }
      innerHtml += '<br><br><button id="photos-link">View photos</button> </div>'
      infoWindow.setContent(innerHtml);
      infoWindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      document.getElementById("photos-link").addEventListener("click", function() {
        // If photos are cached pull them from local Storage and return
        if (typeof(Storage) && localStorage[beach.title]) {
          let links = localStorage[beach.title].split(",");
          app.setState(() => ({
            pictures: links,
            place: beach.title}));
            app.activateLink();
            return;
          }
          // Clear any previously displayed photos
          if (photos.length > 0) {
            photos = []
          }
          // the http request to flickr, all restricting attributes are set in here as well
          let link = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f97455aeea8de971ec02dc9714816d4&text=sea&lat=${beach.location.lat}&lon=${beach.location.lng}&radius=0.2&radius_units=km&per_page=20&format=json&nojsoncallback=1`
          fetch(link).then(function(res) {
            res.json().then(function(parsed) {
              // Create flickr image link, method from https://stackoverflow.com/questions/43703296/use-json-output-from-flickr-to-display-images-from-search
              let _s = parsed.photos.photo;
              for (let z = 0; z < parsed.photos.photo.length; z++)
              {
                let currentPhotoUrl = 'https://farm'+_s[z]['farm']+'.staticflickr.com/'+_s[z]['server']+'/'+_s[z]['id']+'_'+_s[z]['secret']+'_z.jpg'
                photos.push(currentPhotoUrl)
              }
              return photos;
            }).then((photos) => {
              // Save fetched images to local storage
              localStorage.setItem(beach.title, photos);
              app.setState(() => ({
                pictures: photos,
                place: beach.title
              }));
              app.activateLink();
            });
          }
        ).catch(function(err) {
          // If request fails, show alert pop-up
          alert("We are sorry something went wrong")
        })
      })
      infoWindow.addListener('closeclick', function() {
        infoWindow.setMarker = null;
      });
    }
  }

  // This function programmatically clicks the hidden Link and changes the url
  activateLink = () => {
    let hiddenLink = document.querySelector('.hidden');
    hiddenLink.click();
  }

  // Called when a filter is applied from the aside menu
  filterLocation = (locationName) => {
    let markers = this.state.markers
    let infoWindow = this.state.infoWindow;
    let app = this;
    for (let marker of markers) {
      if (marker.title === locationName) {
        // If location was filtered out, this will show it again
        app.setState(() => ({
          place: marker.title
        }))
        // Keep the clicked marker and make it bounce
        marker.setMap(this.state.map)
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(function () {
          marker.setAnimation(null);
          let beach = beaches.filter((b) => b.title === locationName)
          app.renderInfoWindow(marker, infoWindow, beach[0], app.state.map);
        }, 600);
      }
      else {
        // Remove all other markers
        marker.setMap(null)
      }
    }
  }

  // Called when show all filter is clicked, restores all markers on the map and makes them bounce
  showAllMarkers = () => {
    for (let marker of this.state.markers) {
      marker.setMap(this.state.map)
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(function () {
        marker.setAnimation(null);
      }, 600);
    }
  }

  // Called when hambureger icon is clicked, informs the state of aside's view
  toggleAside = () => {
    (this.state.showAside ?
      this.setState(() => ({
        showAside: false
      })) :
      this.setState(() => ({
        showAside: true
      }))
    )
  }

  // Toggles the show class on the aside, to toggle it's view
  checkAsideDisplay = () => {
    if (this.state.showAside) {
      return "filter-container show"
    }
    else {
      return "filter-container"
    }
  }


  /* Async load map idea from https://stackoverflow.com/questions/41709765/how-to-load-the-google-maps-api-script-in-my-react-app-only-when-it-is-require
  the component will receive this props from the async-load package, these inform if async-load succeeded or failed */
  componentWillReceiveProps ({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {
        // If script loaded render the map
        this.initMap()
      }
      else {
        this.setState(() => ({
          // If script failed inform the state
          scriptFail: true
        }))
      }
    }
  }

  render() {
    return (
      <div className="App">
        {/* We can't use the Link component inside the infoWindow of google maps API, so we create a hidden link, and we trigger
          it when another event happens, in this case a click to a regular button (inside the infoWindow)*/}
          <Link to={`/photos/${this.state.place.replace(/\s/g, '_')}`} tabIndex="-1" className="hidden">can't see me</Link>
          <header>
            <Button name="Toggle" aria-label="Toggle Side Panel" className="toggle-filters" onClick={() => this.toggleAside()}>
              <Glyphicon glyph="menu-hamburger" />
            </Button>
            <h1>
              Lefkada's beach viewer
            </h1>
          </header>
          <main>
            <aside className={this.checkAsideDisplay()}>
              <FilterOptions options={beaches} applyFilter={this.filterLocation} showAllBeaches={this.showAllMarkers}/>
            </aside>
            <section id="map-container">
              <div id="map" role="application" style={{height:"90vh"}}>
                {/* A load fail message for the user */}
                {this.state.scriptFail && (
                  <p id="map-fail">
                    <span id="sad-face">&#x2639;</span>
                    We are sorry the map could not load for now </p>)}
                  </div>
                </section>
              </main>
              <footer>Powered by <a href="https://developers.google.com/maps/documentation/javascript/tutorial">Google maps</a> and <a href="https://www.flickr.com/">Flickr.</a></footer>
              <Route path="/photos" render={({history}) => <ShowModal picsToRender={this.state.pictures} beach={this.state.place} history={history}/>} />
            </div>
          )
        }
      }

      // We use scriptLoader from async react-async-script-loader package
      export default scriptLoader(['https://maps.googleapis.com/maps/api/js?key=AIzaSyCENzVbJtz4UfWe1CN0Em6l5d7IXmNfAM8&libraries=places'])(App)
