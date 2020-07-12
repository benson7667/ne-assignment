import React, { Component } from "react";
import moment from "moment";

import {
  Banner,
  IconButton,
  Table,
  Pagination,
  TitleBlock,
} from "../components";

import { DO_MMM_YYYY } from "../constants/dateTimeFormat";
import { DEFAULT_PAGINATION } from "../constants/pagination";
import { fetchCoupons } from "../apis";
import "../styles/main.scss";

const getColumns = (firstIndex) => [
  {
    title: "No",
    key: "no",
    render: (text, records, index) => `${firstIndex + index + 1}`,
  },
  {
    title: "Coupon",
    key: "couponCode",
    sorter: true,
  },
  {
    title: "Discount",
    key: "discount",
    render: (text) => {
      return (
        <div>
          <div>{`$ ${text}`}</div>
          <div className="c-grey-a7 mt4">Cart Discount</div>
        </div>
      );
    },
  },
  {
    title: "Limit",
    key: "maxRedemption",
    render: (text) => <span className="c-grey-a7">{`${text} per user`}</span>,
  },
  {
    title: "Validity",
    key: "validity",
    render: (text, records) => {
      const formattedStartDate = moment(records.startDate).format(DO_MMM_YYYY);
      const formattedExpDate = moment(records.expiryDate).format(DO_MMM_YYYY);

      return (
        <div>
          <div>{formattedStartDate}</div>
          <div className="c-grey-a7 mt4">{formattedExpDate}</div>
        </div>
      );
    },
  },
  {
    title: "Status",
    key: "status",
    render: (text) => <span className="c-grey-a7">{text}</span>,
  },
  {
    title: "Actions",
    key: "actions",
    render: (text, records) => {
      return (
        <IconButton
          iconSrc="https://storage.googleapis.com/coding_challenge_assets/vertical-ellipsis.svg"
          onClick={() =>
            alert(`You clicked action button on coupon-id:${records.id}`)
          }
        />
      );
    },
  },
];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLimit: DEFAULT_PAGINATION.limit,
      currentPage: DEFAULT_PAGINATION.page,
      couponList: [],
      totalCouponsCount: 0,
      sort: {},
    };
  }

  componentDidMount() {
    this.getCouponList();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentPage } = this.state;

    // re-fetch list when user paginate to diff page
    if (prevState.currentPage !== currentPage) {
      this.getCouponList();
    }
  }

  getCouponList = () => {
    const { currentPage, pageLimit } = this.state;
    const { couponList } = this.props;
    const upperBoundary = currentPage * pageLimit;
    const lowerBoundary = upperBoundary - pageLimit;
    const currentPageCouponList = couponList.slice(
      lowerBoundary,
      upperBoundary
    );
    this.setState({ couponList: currentPageCouponList });
  };

  handlePaginationChange = (newCurrentPage) => {
    this.setState({ currentPage: newCurrentPage });
  };

  handleSort = (key) => () => {
    const { sort } = this.state;

    // the column not sorted yet
    if (!sort[key]) {
      sort[key] = true;
      return this.sortColumnByAlphabets("asc", key);
    }

    // the column is sorted, reverse the sort again
    const newSort = { ...sort };
    delete newSort[key];
    this.setState({ sort: newSort });
    return this.sortColumnByAlphabets("desc", key);
  };

  sortColumnByAlphabets = (type = "asc", key) => {
    const { couponList } = this.state;
    const sortedCouponList = couponList.sort((a, b) => {
      const textA = a[key].toUpperCase();
      const textB = b[key].toUpperCase();

      // sort in ascending order
      if (type === "asc") {
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      }

      // sort in descending order
      if (type === "desc") {
        return textA < textB ? 1 : textA > textB ? -1 : 0;
      }
    });

    this.setState({ couponList: sortedCouponList });
  };

  render() {
    const { currentPage, couponList, pageLimit } = this.state;
    const { couponCount } = this.props;
    const firstIndex = currentPage * pageLimit - pageLimit;

    return (
      <div className="pa20 mb50 mh-auto" style={{ maxWidth: "1280px" }}>
        <TitleBlock title="Coupons" />

        <Table
          columns={getColumns(firstIndex)}
          dataSource={couponList}
          handleSort={this.handleSort}
        />
        <Pagination
          currentPage={currentPage}
          totalCount={couponCount}
          pageLimit={pageLimit}
          onChange={this.handlePaginationChange}
        />

        <div className="flex justify-end">
          <Banner />
        </div>
      </div>
    );
  }
}

export async function getServerSideProps() {
  const couponsData = await fetchCoupons();

  return {
    props: {
      couponList: couponsData.data.coupon,
      couponCount: couponsData.data.count,
    },
  };
}

export default Home;
