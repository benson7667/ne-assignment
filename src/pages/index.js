import React from "react";
import moment from "moment";
import { IconButton, Table } from "../components";

import "../styles/main.scss";
import { DO_MMM_YYYY } from "../constants/dateTimeFormat";
import dummyList from "../dummy/couponList.json";

const columns = [
  {
    title: "No",
    key: "no",
    render: (text, records, index) => `${index + 1}`,
  },
  {
    title: "Coupon",
    key: "couponCode",
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
      console.log(records);
      const formattedStartDate = moment(records.startDate).format(DO_MMM_YYYY);
      const formattedExpiryDate = moment(records.expiryDate).format(
        DO_MMM_YYYY
      );

      return (
        <div>
          <div>{formattedStartDate}</div>
          <div className="c-grey-a7 mt4">{formattedExpiryDate}</div>
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

const Home = () => (
  <div style={{ maxWidth: 1280, margin: "0 auto" }}>
    <Table columns={columns} dataSource={dummyList.data.coupon} />
  </div>
);

export default Home;
