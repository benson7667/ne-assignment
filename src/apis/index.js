import axios from "axios";
import config from "../config";

export const fetchCoupons = async () =>
  axios
    .get(`${config.baseUrl}/coding_challenge_assets/data.json`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
