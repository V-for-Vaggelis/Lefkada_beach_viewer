import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={11}
    defaultCenter={{lat: 38.7066464, lng: 20.640729999999962}}
  >
    {props.isMarkerShown && <Marker position={{lat: 38.7066464, lng: 20.640729999999962}} />}
  </GoogleMap>
))


export default MyMapComponent
