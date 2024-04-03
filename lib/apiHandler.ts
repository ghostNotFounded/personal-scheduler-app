import axios from "axios";

import { BASE_URL } from "@/constants";
import { CheckTokenExpiry } from "./tokenExpired";

export const fetchData = async (extension: string) => {
  const token = window.localStorage.getItem("token");

  CheckTokenExpiry();

  const url = BASE_URL + extension;
  const Authorization = "Bearer " + token;

  const response = await axios.get(url, { headers: { Authorization } });

  return response?.data;
};

export const postData = async (extension: string, data: any) => {
  const token = window.localStorage.getItem("token");

  CheckTokenExpiry();

  const url = BASE_URL + extension;
  const Authorization = "Bearer " + token;

  const response = await axios.post(url, data, { headers: { Authorization } });

  return response?.data;
};

export const deleteData = async (extension: string) => {
  const token = window.localStorage.getItem("token");

  CheckTokenExpiry();

  const url = BASE_URL + `/${extension}`;
  const Authorization = "Bearer " + token;

  const response = await axios.delete(url, { headers: { Authorization } });

  return response?.data;
};
