import React from 'react';
import '../App.css';
import { Modal, Carousel, Image } from 'react-bootstrap';


function ShowModal (props)  {
  let pics = [];
  let name;
  // If user refreshes while on the modal link, this will help show the images again
  if (props.picsToRender.length === 0) {
    let constPart = `${process.env.PUBLIC_URL}/photos/`;
    console.log(constPart);
    let slicedPart = window.location.href.slice(constPart.length);
    console.log(slicedPart);
    let activeBeach = slicedPart.replace(/_/g, ' ');
    if (typeof(Storage) && localStorage[activeBeach]) {
      pics = localStorage[activeBeach].split(",");
    }
    name = activeBeach;
  }
  else {
    pics = props.picsToRender;
    name = props.beach;
  }
  return (
    <Modal show={true} onHide={() => {props.history.push(`${process.env.PUBLIC_URL}/`);}}>
      <Carousel>
        {pics.map((pic) => {
          // just a narrow image I want to avoid showing
          if (pic === "https://farm3.staticflickr.com/2889/33761682621_6d48304f67_z.jpg") {
            return ;
          }
          return (
            <Carousel.Item key={pic}>
              <Image responsive width={"100%"} alt={`A picture of ${name}`} src={pic} />
              <Carousel.Caption id="caption">
                <h3 id="beach-header">{name} Lefkada</h3>
                <a id="flickr-link" href="https://www.flickr.com/">www.flickr.com</a>
              </Carousel.Caption>
            </Carousel.Item>
          )}
        )}
      </Carousel>
    </Modal>
  )
}

export default ShowModal
