import { backendUrl } from "./endPints";
import axios from "axios";

export const instance = axios.create({
  baseURL: `${backendUrl}/api/v1`,
});

// apiconnector.js
export const apiconnector = async (method, url, data = {}, headers = {}) => {
  try {
    const response = await instance({
      method,
      url,
      data,
      headers,
    });

    return response.data;
  } catch (err) {
    console.error("Error inside api-connector function - ", err.message || err);
    throw err;
  }
};

