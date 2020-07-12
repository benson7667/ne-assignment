import React from "react";
import "./styles.scss";

const Banner = () => {
  return (
    <div className="banner-container" style={{ width: 450 }}>
      <p>
        I changed to 10 records per page, so we can see the pagination behaviour
        when there is more pages to handle.
      </p>
      <p>
        You can changed number of records per page by editing the constant value
        'DEFAULT_PAGINATION.limit' at '/src/constants/pagination.js'
      </p>
    </div>
  );
};

export default Banner;
