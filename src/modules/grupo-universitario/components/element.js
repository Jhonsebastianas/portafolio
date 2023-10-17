import React from "react";
import PropTypes from 'prop-types';

const Element = (props) => {
  const { number } = props;
  return (
    <div className={`element${number}`}></div>
  );
}

Element.propTypes = {
  number: PropTypes.number,
}

export default Element;