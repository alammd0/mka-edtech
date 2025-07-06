import { apiconnector } from "../apicontector";
import { PaymentEndPoints } from "../endPints";

const {
  BUY_COURSE_API,
  VERIFY_PAYMENT_API,
  GET_BUY_COURSE_API,
  PAYMENT_HISTORY_API,
} = PaymentEndPoints;

// buy-course
export const buyCourse = async (courseId, token) => {
  try {
    const response = await apiconnector(
      "POST",
      BUY_COURSE_API,
      { courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    // console.log("response in api", response);

    if (!response) {
      throw new Error("No give response from server side...");
    }

    return response;
  } catch (error) {
    console.error(error);
  }
};

// verify-payment
export const verifyPayment = async (data, token) => {
  // console.log("Verify Data - ", data);

  try {
    const response = await apiconnector("POST", VERIFY_PAYMENT_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response || !response.data) {
      throw new Error("No give response from server side...");
    }

    return response;
  } catch (error) {
    console.error(error);
  }
};

// get-parches course
export const getParchesCourse = async (token) => {
  // console.log("Token - ", token);
  try {
    const response = await apiconnector("GET", GET_BUY_COURSE_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response || !response.data) {
      throw new Error("No give response from server side...");
    }

    return response;
  } catch (error) {
    console.error(error);
  }
};

// get-payment history
export const getpaymenthistory = async (token) => {
  try {
    const response = await apiconnector("GET", PAYMENT_HISTORY_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response || !response.data) {
      throw new Error("No give response from server side...");
    }

    return response;
  } catch (error) {
    console.error(error);
  }
};
