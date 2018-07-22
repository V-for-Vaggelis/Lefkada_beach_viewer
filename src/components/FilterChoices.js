import React, { Component } from 'react';
import '../App.css';
import { ButtonGroup, Button, ButtonToolbar, SplitButton, MenuItem } from 'react-bootstrap';

class FilterOptions extends Component  {
  state = {
    filtered: this.props.options,
    activeFilter: "all beaches"
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
      <div id="button-container">
        <ButtonToolbar id="filter-options">
          <SplitButton value={this.state.activeFilter} title={this.state.activeFilter} id="split-button-pull-right" pullRight aria-role="Animates filtered locations" 
            onClick={(e) => this.filterOptions(e.target.value)}
            onSelect={(val) => {
              this.filterOptions(val);
              this.setState(() => ({
                activeFilter: val
              }))
            }}>
            <MenuItem className="option"
              eventKey="all beaches">All beaches</MenuItem>
            <MenuItem className="option"
              eventKey="organised">Organised</MenuItem>
            <MenuItem className="option"
              eventKey="partly-organised">Partly-organised</MenuItem>
            <MenuItem className="option"
              eventKey="unspoilt">Unspoilt</MenuItem>
            <MenuItem className="option"
              eventKey="camping">Camping</MenuItem>
            <MenuItem className="option"
              eventKey="water-sports">Water-sports</MenuItem>
            <MenuItem className="option"
              eventKey="windsurfing">Windsurfing</MenuItem>
            <MenuItem className="option"
              eventKey="sky-parachute">Sky-parachute</MenuItem>
          </SplitButton>;
          </ ButtonToolbar>
          <ButtonGroup id="group" aria-label="Show all locations on map" vertical>
            {this.state.filtered.map((option) => {
              return (
                <Button href="#photos-link" aria-label="Filter location on map" className="filter-button" key={option.title}
                  value={option.title} onClick={() => this.props.singleOutLocation(option.title)}>{option.title} {this.checkFlag(option)} </Button>
              )
            })}
          </ButtonGroup>
        </div>
      )
    }
  }

  export default FilterOptions
