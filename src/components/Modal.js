import React from 'react';
import '../App.css';
import { Modal, Carousel, Image } from 'react-bootstrap';


function ShowModal (props)  {
  let pics = [];
  let name;
  // If user refreshes while on the modal link, this will help show the images again
  if (props.picsToRender.length === 0) {
    let link = window.location.href;
    // If I replace / with ' inside the link I create some substring that are easy to search for
    let changedLink = link.replace(/\//g, "'");
    // Search for substring 'photos' which initially was /photos/, that's a good start to pul the beache's name
    let photosStart = changedLink.indexOf("photos");
    let photosEnd = photosStart + 7;
    // Find where the part /photos/ of the link ends, and slice the rest of the link
    let beachName = link.slice(photosEnd);
    // Replace underscores with gaps in the name cause that's how hardcoded names are saved in the code
    let activeBeach = beachName.replace(/_/g, ' ');
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
