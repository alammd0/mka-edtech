import { toast } from "react-toastify";

import { CategoryEndPoints } from "../endPints";
import { apiconnector } from "../apicontector";

const { CREATE_CATEGORY_API, GET_ALL_CATEGORY_API } = CategoryEndPoints;

export const createcategory = async (url, method, data, headers, navigate) => {
  try {

  } catch (err) {

  }
};

export const getallcategory = async () => {
  try {
    const response = await apiconnector(
        "GET",
        GET_ALL_CATEGORY_API
    );
    
    if (!response) {
      throw new Error("Not gives response");
    }
    return response;

  } catch (err) {
    console.error(err);
    throw new Error();
  }
};
