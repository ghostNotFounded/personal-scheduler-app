import axios from "axios";

import { BASE_URL } from "@/constants";
import { checkTokenExpiry } from "./tokenExpired";

export const fetchData = async (extension: string) => {
  const token = window.localStorage.getItem("token");

  checkTokenExpiry(token as string);

  const url = BASE_URL + extension;
  const Authorization = "Bearer " + token;

  const response = await axios.get(url, { headers: { Authorization } });

  return response?.data;
};
