import React from "react";
import "./styles.scss";

const IconButton = (props) => {
  const { iconSrc, onClick } = props;

  return (
    <button className="btn-icon" onClick={onClick}>
      <img src={iconSrc} />
    </button>
  );
};

export default IconButton;
