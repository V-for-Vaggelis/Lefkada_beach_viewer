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
    <ButtonGroup vertical>
    {props.options.map((option) => {
      return (
        <Button key={option.title} value={option.title} onClick={() => props.applyFilter(option.title)}>{option.title} {checkFlag(option)} </Button>
      )
    })}
    </ButtonGroup>
  )
}

export default FilterOptions
