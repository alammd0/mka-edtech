import { CourseEndPoints } from "../endPints";
import { apiconnector } from "../apicontector";
import { SectionEndPoints } from "../endPints";

const { CREATE_COURSE_API } = CourseEndPoints;
const { CREATE_SECTION_API, UPDATE_SECTION_API, DELETE_SECTION_API } =
  SectionEndPoints;

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
      Authorization: `Bearer ${token}`
    });

    if(!response){
      throw new Error
    }

    return response ;

  } catch (error) {
    console.log(error);
  }
};

export const deleteSection = async (sectionId, token) => {
  try{
    // console.log("SectionId - ", sectionId);
    const response = await apiconnector("DELETE", `${DELETE_SECTION_API}/${sectionId}`, sectionId, {
      Authorization: `Bearer ${token}`
    })

    if(!response){
      throw new Error
    }

    return response;
  }catch(err){
    console.log(err);
  }
};
