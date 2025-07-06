// export const backendUrl = "http://localhost:4000";
export const backendUrl = "https://mka-edtech.onrender.com";

// User EndPoint
export const UserEndPoints = {
  SIGNUP_API: `${backendUrl}/api/v1/auth/signup`,
  LOGIN_API: `${backendUrl}/api/v1/auth/login`,
  FORGET_PASSWORD_API: `${backendUrl}/api/v1/auth/forget-password`,
  GET_USER_API: `${backendUrl}/api/v1/auth/get-user`,
};

// profile Endpoints
export const ProfileEndPoints = {
  UPDATE_PASSWORD_API: `${backendUrl}/api/v1/profile/update-password`,
  UPDATE_PROFILE_API: `${backendUrl}/api/v1/profile/update-profile`,
  UPDATE_PROFILE_PIC_API: `${backendUrl}/api/v1/profile/update-profile-image`,
};

// Category EndPoint
export const CategoryEndPoints = {
  CREATE_CATEGORY_API: `${backendUrl}/api/v1/course/create-category`,
  GET_ALL_CATEGORY_API: `${backendUrl}/api/v1/course/get-category`,
};

// Course EndPoint
export const CourseEndPoints = {
  CREATE_COURSE_API: `${backendUrl}/api/v1/course/create-course`,
  UPDATE_COURSE_API: `${backendUrl}/api/v1/course/update-course`,
  DELETE_COURSE_API: `${backendUrl}/api/v1/course/delete-course`,
  GET_ALL_COURSE_API: `${backendUrl}/api/v1/course/get-all-courses`,
  GET_COURSE_DETAILS_BY_ID_API: `${backendUrl}/api/v1/course/get-course-details`,
};

// Section Endpoints
export const SectionEndPoints = {
  CREATE_SECTION_API: `${backendUrl}/api/v1/course/create-section`,
  UPDATE_SECTION_API: `${backendUrl}/api/v1/course/update-section`,
  DELETE_SECTION_API: `${backendUrl}/api/v1/course/delete-section`,
};

// Sub-Section Endpoint
export const SubSectionEndPoints = {
  CREATE_SUB_SECTION_API: `${backendUrl}/api/v1/course/create-sub-section`,
  UPDATE_SUB_SECTION_API: `${backendUrl}/api/v1/course/update-sub-section`,
  DELETE_SUB_SECTION_API: `${backendUrl}/api/v1/course/delete-sub-section`,
};

// payment endPoint
export const PaymentEndPoints = {
  BUY_COURSE_API: `${backendUrl}/api/v1/payment/buycourse`,
  VERIFY_PAYMENT_API: `${backendUrl}/api/v1/payment/verify-payment"`,
  GET_BUY_COURSE_API: `${backendUrl}/api/v1/payment/get-parches-course`,
  PAYMENT_HISTORY_API: `${backendUrl}/api/v1/payment/payment-history`
};


// ratingAndReview EndPoints 
export const RatingAndReview = {
  CREATE_RATING_AND_REVIEW_API : `${backendUrl}/api/v1/rating/create-rating-review`,
  GET_ALL_RATING_AND_REVIEW_API : `${backendUrl}/api/v1/rating/get-all-rating-review`
}