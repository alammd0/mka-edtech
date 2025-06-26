import { CourseEndPoints } from "../endPints";
import { apiconnector } from "../apicontector";

const { CREATE_COURSE_API } = CourseEndPoints;

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

    console.log("CREATE_COURSE_API Response:", response.data);
    return response.data;
  } catch (err) {
    console.error("CREATE_COURSE_API Error:", err);
    throw err;
  }
};
