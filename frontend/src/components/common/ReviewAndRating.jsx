import React, { useEffect, useState } from "react";
import { getRatingAndReview } from "../../services/opreation/ratingAndReview";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";

const ReviewAndRating = () => {
  const [ratingAndReview, setRatingAndReview] = useState([]);

  const fetchRatingAndReview = async () => {
    try {
      const response = await getRatingAndReview();

      if (!response) {
        throw new Error("Server Not Response");
      }
      setRatingAndReview(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRatingAndReview();
  }, []);

  console.log("Rating and review -", ratingAndReview);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i < rating ? "text-yellow-400" : "text-gray-300"}
        />
      );
    }
    return stars;
  };

  return (
    <div className="w-9/12 mx-auto mb-20">
      <div>
        <h1 className="text-3xl font-bold font-inter text-center capitalize">
          Review Form other Learner
        </h1>

        {ratingAndReview.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-xl font-semibold">No Rating And Review Found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {ratingAndReview.map((review) => (
              <div
                key={review._id}
                className="bg-richblack-800 p-6 rounded-lg shadow-lg flex flex-col gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex gap-2 flex-col">
                    <div className="">
                      <p className="text-lg font-semibold capitalize">
                        {review.user.firstName} {review.user.lastName}
                      </p>
                      <p>{review.user.email}</p>
                    </div>

                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-richblack-300">{review.review}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewAndRating;
