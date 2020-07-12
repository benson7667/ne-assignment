import moment from "moment";
import { IconButton } from "../components";
import { DO_MMM_YYYY } from "./dateTimeFormat";

export const getColumns = (firstIndex) => [
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
