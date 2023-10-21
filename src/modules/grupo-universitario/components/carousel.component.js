import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import Gallery from 'react-image-gallery';
import PropTypes from 'prop-types';

const CarouselComponent = (props) => {
  const { images } = props;

  return (
    <div className="bulb">
      <Gallery items={images} />
    </div>
  );
}

CarouselComponent.propTypes = {
  images: PropTypes.array,
}

export default CarouselComponent;