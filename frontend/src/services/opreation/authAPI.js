import { UserEndPoints } from "../endPints";
import { apiconnector } from "../apicontector";

const { SIGNUP_API, LOGIN_API, GET_USER_API, FORGET_PASSWORD_API } =
  UserEndPoints;

export const signup = async (data) => {

//   console.log("User info Data - ", data);

  try {
    let response = await apiconnector("POST", SIGNUP_API, data);

    if (!response) {
      throw new Error("Not gives response");
    }

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const login = async (data) => {

  try {
    const response = await apiconnector("POST", LOGIN_API, data);

    if (!response) {
      throw new Error("Not gives response");
    }

    return response;

  } catch (err) {
    console.log(err);
  }
};
