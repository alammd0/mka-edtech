import { apiconnector } from "../apicontector";
import { RatingAndReview } from "../endPints";

const { CREATE_RATING_AND_REVIEW_API, GET_ALL_RATING_AND_REVIEW_API} = RatingAndReview;

export const createRatingAndReview = async (data, token) => {
  try {
    const response = await apiconnector(
      "POST",
      CREATE_RATING_AND_REVIEW_API,
      data,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response) {
      throw new Error("No Server response");
    }

    return response;
  } catch (error) {
    console.error(error);
  }
};


export const getRatingAndReview = async () => {
    try{
        const response = await apiconnector("GET", GET_ALL_RATING_AND_REVIEW_API);

        if(!response || !response.data){
            throw new Error("Server not response");
        }

        return response;
    } catch(error){
        console.error(error);
    }
}