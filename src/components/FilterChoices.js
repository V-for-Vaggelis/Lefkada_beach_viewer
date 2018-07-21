import React, { Component } from 'react';
import '../App.css';
import { ButtonGroup, Button } from 'react-bootstrap';

class FilterOptions extends Component  {

  // Adds a blue flag to rewarded beaches
  checkFlag = (val) => {
    if (val.flag) {
      return (<span id='flag'>&#9873;</span>)
    }
    else {
      return
    }
  }
  render () {
    return (
      <ButtonGroup id="group" aria-label="Show all locations on map" vertical>
        <select id="filter-options" defaultValue="All beaches">
          <option value="All beaches">All beaches</option>
          <option value="organised">organised</option>
          <option value="partly-organised">partly-organised</option>
          <option value="untouched">untouched</option>
          <option value="camping">camping</option>
          <option value="water-sports">water-sports</option>
          <option value="windsurfing">windsurfing</option>
          <option value="sky-parachute">sky-parachute</option>
        </select>
        {this.props.options.map((option) => {
          return (
            <Button href="#photos-link" aria-label="Filter location on map" className="filter-button" key={option.title}
              value={option.title} onClick={() => this.props.applyFilter(option.title)}>{option.title} {this.checkFlag(option)} </Button>
          )
        })}
      </ButtonGroup>
    )
  }
}

export default FilterOptions
