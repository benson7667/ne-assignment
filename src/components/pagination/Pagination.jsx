import React, { Component } from "react";
import "./styles.scss";

class Pagination extends Component {
  render() {
    return (
      <div className="pagination-container">
        <div>Showing 1 - 20 of 15194</div>

        <div className="pagination-page-controller">
          <div className="pagination-page-prev disabled">&#8249;</div>
          <ul className="pagination-page-list">
            <li className="pagination-page-item active">1</li>
            <li className="pagination-page-item">2</li>
            <li className="pagination-page-item">3</li>
            <li className="pagination-page-item">4</li>
          </ul>
          <div className="pagination-page-next">&#8250;</div>
        </div>
      </div>
    );
  }
}

export default Pagination;
