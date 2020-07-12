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
      totalPage: this.initTotalPageValue(),
      paginationScale: this.initPaginationScale(),
    };
  }

  componentDidUpdate(prevProps) {
    const { currentPage, pageLimit, totalCount } = this.props;
    const { paginationScale, totalPage } = this.state;

    // page changed
    if (prevProps.currentPage !== currentPage) {
      //   const totalPage = getTotalPage(totalCount, pageLimit);
      const newPaginationScale = getPaginationScale(
        paginationScale,
        currentPage,
        totalPage
      );
      this.setState({ paginationScale: newPaginationScale });
    }
  }

  initTotalPageValue = () => {
    const { totalCount, pageLimit } = this.props;
    const totalPage = getTotalPage(totalCount, pageLimit);
    return totalPage;
  };

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
        {this.renderMorePrev()}

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

        {this.renderMoreNext()}
      </ul>
    );
  };

  renderMoreNext = () => {
    const { paginationScale, totalPage } = this.state;
    const lastPageNumber = totalPage;

    // eg: when user are in page 7, paginationScale = [5,6,7,8,9], we dont need render ... anymore
    // instead, just render pageNumber 10 to form [5,6,7,8,9,10]
    if (paginationScale[paginationScale.length - 1] + 1 === lastPageNumber) {
      return (
        <li id={lastPageNumber} className="pagination-page-item">
          {lastPageNumber}
        </li>
      );
    }

    // if last page number do not exist in the paginationScale arr
    // render ... and lastPage number
    if (paginationScale.indexOf(lastPageNumber) === -1) {
      return (
        <>
          <li id="more-next" className="pagination-page-item">
            ...
          </li>
          <li id={lastPageNumber} className="pagination-page-item">
            {lastPageNumber}
          </li>
        </>
      );
    }
    return null;
  };

  renderMorePrev = () => {
    const { paginationScale } = this.state;
    const firstPageNumber = 1;

    // eg: when user are in page 4, paginationScale = [2,3,4,5,6], we dont need render ... anymore
    // instead, just render pageNumber 1 to form [1,2,3,4,5,6]
    if (paginationScale[0] - 1 === 1) {
      return (
        <li id={firstPageNumber} className="pagination-page-item">
          {firstPageNumber}
        </li>
      );
    }

    // if first page number do not exist in the paginationScale arr
    // render ... and firstPage number
    if (paginationScale.indexOf(firstPageNumber) === -1) {
      return (
        <>
          <li id={firstPageNumber} className="pagination-page-item">
            {firstPageNumber}
          </li>
          <li id="more-prev" className="pagination-page-item">
            ...
          </li>
        </>
      );
    }

    return null;
  };

  handlePaginationChange = (e) => {
    const { currentPage, onChange } = this.props;
    const { paginationScale } = this.state;

    const id = e.target.id;
    let newCurrentPage = 0;

    if (!id) return;

    switch (id) {
      case "btn-prev":
        if (this.isFirstPage()) return;
        newCurrentPage = currentPage - 1;
        break;

      case "more-prev":
        const firstNumberInPaginationScale = paginationScale[0];
        newCurrentPage = firstNumberInPaginationScale - 1;
        break;

      case "btn-next":
        if (this.isLastPage()) return;
        newCurrentPage = currentPage + 1;
        break;

      case "more-next":
        const lastNumberInPaginationScale =
          paginationScale[paginationScale.length - 1];
        newCurrentPage = lastNumberInPaginationScale + 1;
        break;

      default:
        break;
    }

    // user click page number
    if (id !== "btn-prev" && id !== "btn-next" && Number(id) > 0) {
      newCurrentPage = Number(id);
    }

    if (newCurrentPage) {
      onChange(newCurrentPage);
    }
  };

  isFirstPage = () => this.props.currentPage === 1;

  isLastPage = () => {
    const { currentPage, pageLimit, totalCount } = this.props;
    const { totalPage } = this.state;
    // const totalPage = getTotalPage(totalCount, pageLimit);
    return currentPage === totalPage;
  };

  render() {
    return (
      <div id="pagination-comp" className="pagination-container">
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
