import React from "react";
import PropTypes from "prop-types";

const Button = ({ name, ...otherProps }) => {
  return <button {...otherProps}>{name}</button>;
};

Button.propTypes = {};

export default Button;
