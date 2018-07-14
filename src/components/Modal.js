import React, { Component } from 'react';
import '../App.css';
import { Modal, Carousel } from 'react-bootstrap';


function ShowModal (props)  {
  return (
    <Modal show={true} onHide={props.closeModal}>
    {console.log(props.picsToRender)}
      <Carousel>
        {props.picsToRender.map((pic) => {
          return (
            <Carousel.Item>
            {console.log(props.picToShow)}
              <img width={"100%"} alt={props.picToShow.alt} src={props.picToShow.url} />
              <Carousel.Caption>
                <p>Image from <a href="https://www.flickr.com/">www.flickr.com</a></p>
              </Carousel.Caption>
            </Carousel.Item>
          )}
    )}
    </Carousel>
    </Modal>
  )
}

export default ShowModal
