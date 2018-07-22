# Lefkada beach viewer

Lefkada beach viewer is an app, that presents the Greek Ionian island of Lefkada and a photo gallery of it's wonderful beaches. The app was built as the final of project of my scholarship in <a href="https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"> Udacity's front-end web developer nanodegree</a>. The general concept of this last project called neighborhood map, is to build an app about a place (with react.js), involving a map and some information about this place's location, pulled from a third party API.

## How to run

navigate in the directory you want to place the app and:

* clone the current repository: `git clone https://github.com/V-for-Vaggelis/Lefkada_beach_viwer`
* navigate in the project's repository `cd Lefkada_beach_viwer`
* install all project dependencies with `npm install`

To run the app you have two options:

#### Production build (recommended)

* npm run build
* serve -s build
* navigate to http://localhost:5000/ on your browser

#### Development build

* start the hosting server with `npm start`

**Note that the service worker is only implemented during production build**.

## How to use

It should be pretty easy to get around. Pick a location by clicking on the map's markers or by selecting it from the list on the left. You can also filter the list of locations to your desired results with the dropdown menu. If you are on a phone or tablet the list probably won't be visible by default. Click on the burger icon on the top left to make it appear. Click the **view photos** button on the pop-up window and enjoy some beautiful images.

## Code dependencies

<ul>
<li> Even though the project was built from scratch, it utilizes **react.js** and all the packages that come with it when installing it from <a href="https://github.com/facebook/create-react-app">facebook's create-react-app</a> package</li>
<li>The <a href="https://developers.google.com/maps/documentation/javascript/tutorial">Google maps API</a></li>
<li><a href="https://www.flickr.com/services/api/">Flickr's API</a> to get some beautiful photos</li>
<li>The <a href="https://github.com/leozdgao/react-async-script-loader">react-async-script-loader</a> package to help load the google maps API asynchronously</li>
<li>The <a href="https://react-bootstrap.github.io/getting-started/introduction/">react-bootstrap</a> package</li>
<li>The <a href="https://www.npmjs.com/package/react-router">react-router</a> package</li>
</ul>




## Compatibility and other issues

This app was developed and tested in Google Chrome's  enviroment, but it should work on any browser and device. Please report any compatibility or other issues.
