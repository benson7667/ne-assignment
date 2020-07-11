import React, { Component } from "react";
import { number, func } from "prop-types";
import cx from "classnames";
import "./styles.scss";

const MAX_PAGES_NUMBER_ARR = [1, 2, 3, 4, 5];

class Pagination extends Component {
  renderPagingInfo = () => {
    const { currentPage, totalCount, pageLimit } = this.props;
    const maxIndex = currentPage * pageLimit;
    return `Showing ${maxIndex - pageLimit + 1} - ${maxIndex} of ${totalCount}`;
  };

  renderPagingNumber = () => {
    const totalPage = this.getTotalPage();
    const numbersArr = this.buildNumberArr(totalPage);

    return (
      <ul className="pagination-page-list">
        {numbersArr.map((number) => (
          <li
            id={number}
            key={number}
            className={cx({
              "pagination-page-item": true,
              active: number === this.props.currentPage,
            })}
          >
            {number}
          </li>
        ))}
      </ul>
    );
  };

  buildNumberArr = (totalPage) => {
    // we will just render pagination 1 -> 5 when there is more than 5 pages
    if (totalPage > 5) {
      return MAX_PAGES_NUMBER_ARR;
    }

    const arr = [];
    for (let i = 0; i < totalPage; i++) {
      arr.push(i + 1);
    }
    return arr;
  };

  handlePaginationChange = (e) => {
    const { currentPage, onChange } = this.props;
    const id = e.target.id;
    let newCurrentPage = 0;

    switch (id) {
      case "btn-prev":
        if (this.isFirstPage()) return;
        newCurrentPage = currentPage - 1;
        break;

      case "btn-next":
        if (this.isLastPage()) return;
        newCurrentPage = currentPage + 1;
        break;

      default:
        break;
    }

    // user click page number
    if (MAX_PAGES_NUMBER_ARR.indexOf(id)) {
      onChange(Number(id));
    }

    if (newCurrentPage) {
      onChange(newCurrentPage);
    }
  };

  isFirstPage = () => this.props.currentPage === 1;

  isLastPage = () => {
    const { currentPage } = this.props;
    const totalPage = this.getTotalPage();
    return currentPage === totalPage;
  };

  getTotalPage = () => {
    const { totalCount, pageLimit } = this.props;
    // eg: totalCount: 81, pageLimit: 20, we will still have total 5 pages
    // eg: totalCount: 100, pageLimit: 20, we have total 5 pages
    const totalPage =
      totalCount % pageLimit === 0
        ? Math.floor(totalCount / pageLimit)
        : Math.floor(totalCount / pageLimit) + 1;

    return totalPage;
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
