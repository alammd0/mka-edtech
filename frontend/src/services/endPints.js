
export const backendUrl = "http://localhost:4000"

// User EndPoint 
export const UserEndPoints = {
    SIGNUP_API : `${backendUrl}/api/v1/auth/signup`,
    LOGIN_API : `${backendUrl}/api/v1/auth/login`,
    FORGET_PASSWORD_API : `${backendUrl}/api/v1/auth/forget-password`,
    GET_USER_API : `${backendUrl}/api/v1/auth/get-user`,
}

// profile Endpoints 
export const ProfileEndPoints = {
  UPDATE_PASSWORD_API : `${backendUrl}/api/v1/update-password`,
  UPDATE_PROFILE_API : `${backendUrl}/api/v1/update-profile`
}

// Category EndPoint
export const CategoryEndPoints = {
    CREATE_CATEGORY_API : `${backendUrl}/api/v1/course/create-category`,
    GET_ALL_CATEGORY_API : `${backendUrl}/api/v1/course/get-category`
}

// Course EndPoint
export const CourseEndPoints = {
    CREATE_COURSE_API: `${backendUrl}/api/v1/course/create-course`,
    UPDATE_COURSE_API: `${backendUrl}/api/v1/course/update-course`,
    DELETE_COURSE_API: `${backendUrl}/api/v1/course/delete-course`,
    GET_ALL_COURSE_API: `${backendUrl}/api/v1/course/get-all-course`,
    GET_COURSE_DETAILS: `${backendUrl}/api/v1/course/get-course-details`,
}

// Section Endpoints
export const SectionEndPoints = {
    CREATE_SECTION_API: `${backendUrl}/api/v1/course/create-section`,
    UPDATE_SECTION_API: `${backendUrl}/api/v1/course/update-section`,
    DELETE_SECTION_API: `${backendUrl}/api/v1/course/delete-section`,
}

// Sub-Section Endpoint
export const SubSectionEndPoints = {
    CREATE_SUB_SECTION_API: `${backendUrl}/api/v1/course/create-sub-section`,
    UPDATE_SUB_SECTION_API: `${backendUrl}/api/v1/course/update-sub-section`,
    DELETE_SUB_SECTION_API: `${backendUrl}/api/v1/course/delete-sub-section`,
}