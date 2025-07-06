import { UserEndPoints } from "../endPints";
import { apiconnector } from "../apicontector";
import { ProfileEndPoints } from "../endPints";

const { SIGNUP_API, LOGIN_API, GET_USER_API, FORGET_PASSWORD_API } =
  UserEndPoints;

const { UPDATE_PROFILE_API, UPDATE_PROFILE_PIC_API } = ProfileEndPoints;

export const signup = async (data) => {
  //   console.error("User info Data - ", data);
  try {
    let response = await apiconnector("POST", SIGNUP_API, data);

    if (!response) {
      throw new Error("Not gives response");
    }

    return response;
  } catch (err) {
    console.error(err);
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
    console.error(err);
  }
};

export const getuser = async (data, token) => {
  try {
    const response = await apiconnector("GET", GET_USER_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response || !response.data) {
      throw new Error("Not given Response...");
    }

    return response;
  } catch (error) {
    console.error("error");
    throw new Error("Error fetching User details");
  }
};

export const forgetPassword = async (data) => {
  try {
    const response = await apiconnector("PUT", FORGET_PASSWORD_API, data);

    if (response) {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

// update user details and profile details
export const updateuserandprofile = async (data, token) => {
  // console.error("Here user and profile data - ", data);

  try {
    const response = await apiconnector("PUT", UPDATE_PROFILE_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response || !response.data) {
      throw new Error("No response please check");
    }

    return response;
  } catch (err) {
    console.error(err);
    console.error("Error - ", err);
  }
};

// update user profile pic
export const updateProfilePic = async (data, token) => {
  // console.error("Profile pic data - ", data);

  try {
    const response = await apiconnector("PUT", UPDATE_PROFILE_PIC_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response || !response.data) {
      throw new Error("No response from server");
    }

    return response;
  } catch (err) {
    console.error("Error updating profile picture:", err);
    throw err;
  }
};
