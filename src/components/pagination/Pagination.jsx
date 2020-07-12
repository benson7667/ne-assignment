import React, { Component } from "react";
import { number, func } from "prop-types";
import cx from "classnames";

import { getPaginationScale, getTotalPage } from "../../utils/pagination";
import "./styles.scss";

// if totalPage > 5, we just show 5 pages in pagination scale
const PAGINATION_SCALE_ARR = [1, 2, 3, 4, 5];

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationScale: this.initPaginationScale(),
    };
  }

  componentDidUpdate(prevProps) {
    const { currentPage, pageLimit, totalCount } = this.props;
    const { paginationScale } = this.state;

    // page changed
    if (prevProps.currentPage !== currentPage) {
      const totalPage = getTotalPage(totalCount, pageLimit);
      const newPaginationScale = getPaginationScale(
        paginationScale,
        currentPage,
        totalPage
      );
      this.setState({ paginationScale: newPaginationScale });
    }
  }

  initPaginationScale = () => {
    const { totalCount, pageLimit } = this.props;
    const totalPage = getTotalPage(totalCount, pageLimit);

    if (totalPage > 5) return PAGINATION_SCALE_ARR;

    const arr = [];
    for (let i = 0; i < totalPage; i++) {
      arr.push(i + 1);
    }
    return arr;
  };

  renderPagingInfo = () => {
    const { currentPage, totalCount, pageLimit } = this.props;
    const maxIndex = currentPage * pageLimit;
    return `Showing ${maxIndex - pageLimit + 1} - ${maxIndex} of ${totalCount}`;
  };

  renderPagingNumber = () => {
    const { paginationScale } = this.state;

    return (
      <ul className="pagination-page-list">
        {paginationScale.map((pageNumber) => (
          <li
            id={pageNumber}
            key={pageNumber}
            className={cx({
              "pagination-page-item": true,
              active: pageNumber === this.props.currentPage,
            })}
          >
            {pageNumber}
          </li>
        ))}
      </ul>
    );
  };

  handlePaginationChange = (e) => {
    const { currentPage, onChange } = this.props;
    const id = e.target.id;
    let newCurrentPage = 0;

    if (!id) return;

    // user click btn-prev
    if (id === "btn-prev") {
      if (this.isFirstPage()) return;
      newCurrentPage = currentPage - 1;
    }

    // user click btn-next
    if (id === "btn-next") {
      if (this.isLastPage()) return;
      newCurrentPage = currentPage + 1;
    }

    // user click page number
    if (id !== "btn-prev" && id !== "btn-next" && Number(id) > 0) {
      newCurrentPage = Number(id);
    }

    onChange(newCurrentPage);
  };

  isFirstPage = () => this.props.currentPage === 1;

  isLastPage = () => {
    const { currentPage, pageLimit, totalCount } = this.props;
    const totalPage = getTotalPage(totalCount, pageLimit);
    console.log({ totalPage, currentPage });
    return currentPage === totalPage;
  };

  render() {
    return (
      <div className="pagination-container">
        <div>{this.renderPagingInfo()}</div>

        <div
          className="pagination-page-controller"
          onClick={this.handlePaginationChange}
        >
          <div
            id="btn-prev"
            className={cx({
              "pagination-page-prev": true,
              disabled: this.isFirstPage(),
            })}
          >
            &#8249;
          </div>

          {this.renderPagingNumber()}

          <div
            id="btn-next"
            className={cx({
              "pagination-page-next": true,
              disabled: this.isLastPage(),
            })}
          >
            &#8250;
          </div>
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  currentPage: number.isRequired,
  totalCount: number.isRequired,
  pageLimit: number.isRequired,
  onChange: func.isRequired,
};

export default Pagination;
