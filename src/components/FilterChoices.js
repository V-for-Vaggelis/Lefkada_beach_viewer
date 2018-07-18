import React, { Component } from 'react';
import '../App.css';
import { ButtonGroup, Button } from 'react-bootstrap';

function FilterOptions (props)  {
  let checkFlag = (val) => {
    if (val.flag) {
      return (<span id='flag'>&#9873;</span>)
    }
    else {
      return
    }
  }

  return (
    <ButtonGroup id="group" aria-label="Show all locations on map" vertical>
      <Button id="all-button" value="Show all" onClick={() => props.showAllBeaches()}>All beaches</Button>
    {props.options.map((option) => {
      return (
        <Button href="#photos-link" aria-label="Filter location on map" className="filter-button" key={option.title} value={option.title} onClick={() => props.applyFilter(option.title)}>{option.title} {checkFlag(option)} </Button>
      )
    })}
    </ButtonGroup>
  )
}

export default FilterOptions
