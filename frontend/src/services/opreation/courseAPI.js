import { CourseEndPoints } from "../endPints";
import { apiconnector } from "../apicontector";
import { SectionEndPoints } from "../endPints";
import { SubSectionEndPoints } from "../endPints";
import { PaymentEndPoints } from "../endPints";

const { CREATE_COURSE_API, GET_ALL_COURSE_API, GET_COURSE_DETAILS_BY_ID_API } =
  CourseEndPoints;

const { CREATE_SECTION_API, UPDATE_SECTION_API, DELETE_SECTION_API } =
  SectionEndPoints;

const {
  CREATE_SUB_SECTION_API,
  UPDATE_SUB_SECTION_API,
  DELETE_SUB_SECTION_API,
} = SubSectionEndPoints;

const { BUY_COURSE_API } = PaymentEndPoints;

export const createCourse = async (data, token) => {
  console.log("Token here - ", token);
  try {
    const response = await apiconnector("POST", CREATE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    });

    if (!response) {
      throw new Error("Not gives response while create Course...");
    }

    // console.log("CREATE_COURSE_API Response:", response.data);
    return response.data;
  } catch (err) {
    console.error("CREATE_COURSE_API Error:", err);
    throw err;
  }
};

export const getAllCourse = async () => {
  try {
    const response = await apiconnector("GET", GET_ALL_COURSE_API);
    console.log(response);
    if (!response || !response.data) {
      throw new Error("Here error - Please check....");
    }

    return response;
  } catch (error) {
    console.log("Error - ", error);
  }
};

export const getcourseById = async (courseId) => {
  try {
    const response = await apiconnector(
      "GET",
      `${GET_COURSE_DETAILS_BY_ID_API}/${courseId}`
    );

    if (!response || !response.data) {
      throw new Error("No response from server side");
    }

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const buyCourse = async (courseId, token) => {
  console.log("CourseId - ", courseId);
  console.log("Token - ", token);

  try {
    const response = await apiconnector(
      "POST",
      BUY_COURSE_API,
      { courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("BUY_COURSE_API Response:", response);

    if (!response.data) {
      throw new Error("No data in response");
    }

    return response;
  } catch (error) {
    console.error("BUY_COURSE_API Error:", error);
    throw error;
  }
};

// export const verifyPaymentAPI = async (data, token) => {
//   try {
//     const response = await apiconnector("POST", VERIFY_PAYMENT_API, data, {
//       Authorization: `Bearer ${token}`,
//     });
//     if (!response.data.success) {
//       throw new Error(response.data.message);
//     }
//     return response.data;
//   } catch (error) {
//     console.error("VERIFY_PAYMENT_API Error:", error);
//     throw error;
//   }
// };

export const createSection = async (data, token) => {
  try {
    const response = await apiconnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response) {
      throw new Error();
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const updateSection = async (data, token) => {
  try {
    // console.log("Data - ", data);

    const response = await apiconnector("PUT", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response) {
      throw new Error();
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteSection = async (sectionId, token) => {
  try {
    // console.log("SectionId - ", sectionId);
    const response = await apiconnector(
      "DELETE",
      `${DELETE_SECTION_API}/${sectionId}`,
      sectionId,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response) {
      throw new Error();
    }

    return response;
  } catch (err) {
    console.log(err);
  }
};

// Sub-Section
export const createSubSection = async (data, token) => {
  console.log("Data - ", data);

  try {
    const response = await apiconnector("POST", CREATE_SUB_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    });

    if (!response) {
      throw new Error();
    }

    return response;
  } catch (error) {
    console.log("Error - ", error);
  }
};

export const deleteSubsection = async (data, token) => {
  try {
    const response = await apiconnector(
      "DELETE",
      DELETE_SUB_SECTION_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response) {
      throw new Error();
    }

    return response;
  } catch (error) {
    console.log(error);
  }
};
