import React from "react";
import { string } from "prop-types";
import "./styles.scss";

const TitleBlock = (props) => {
  const { title } = props;
  return <div className="title-block-container">{title}</div>;
};

TitleBlock.propTypes = {
  title: string.isRequired,
};

export default TitleBlock;
