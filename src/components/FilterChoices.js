import React, { Component } from 'react';
import '../App.css';
import { ButtonGroup, Button } from 'react-bootstrap';

class FilterOptions extends Component  {
  state = {
    filtered: this.props.options
  }

  // Filters options based on selected option from dropdown
  filterOptions = (filter) => {
    let filtered = this.props.options.filter((option) => {
      for (let word of option.filters) {
        if (word === filter) {
          return true;
        }
      }
    })
    this.setState(() => ({
      filtered: filtered
    }))
    let filteredNames = [];
    for (let f of filtered) {
      filteredNames.push(f.title);
    }
    this.props.applyFilter(filteredNames);
  }

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
        <select id="filter-options" defaultValue="All beaches" onChange={(e) => this.filterOptions(e.target.value)}>
          <option className="option" value="all beaches">all beaches</option>
          <option className="option" value="organised">organised</option>
          <option className="option" value="partly-organised">partly-organised</option>
          <option className="option" value="unspoilt">unspoilt</option>
          <option className="option" value="camping">camping</option>
          <option className="option" value="water-sports">water-sports</option>
          <option className="option" value="windsurfing">windsurfing</option>
          <option className="option" value="sky-parachute">sky-parachute</option>
        </select>
        {this.state.filtered.map((option) => {
          return (
            <Button href="#photos-link" aria-label="Filter location on map" className="filter-button" key={option.title}
              value={option.title} onClick={() => this.props.singleOutLocation(option.title)}>{option.title} {this.checkFlag(option)} </Button>
          )
        })}
      </ButtonGroup>
    )
  }
}

export default FilterOptions
