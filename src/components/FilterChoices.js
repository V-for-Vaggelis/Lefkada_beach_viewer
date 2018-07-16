import React, { Component } from 'react';
import '../App.css';
import { ButtonGroup, Button } from 'react-bootstrap';

function FilterOptions (props)  {
  return (
    <ButtonGroup vertical>
    {props.options.map((option) => {
      return (
        <Button key={option.title} value={option.title} onClick={() => props.applyFilter(option.title)}>{option.title}</Button>
      )
    })}
    </ButtonGroup>
  )
}

export default FilterOptions
