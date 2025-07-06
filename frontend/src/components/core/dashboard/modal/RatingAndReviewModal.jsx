import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createRatingAndReview } from "../../../../services/opreation/ratingAndReview";

const RatingAndReviewModal = ({courseId, setRatingReviewModal, setRatingAndReview}) => {
  const { user } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    register("rating", { required: true });
  }, [register]);

  const ratingChanged = (event, newValue) => {
    setValue("rating", newValue);
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Please wait...");
    
    try{
      const ratingData =  {
        courseId : courseId,
        review : data.review,
        rating : data.rating
      } 

      const response = await createRatingAndReview(ratingData, token);

      if(!response){
        toast.error("Server Not response Message...");
        return;
      }

      setRatingAndReview(response.data);
      toast.success("Thank You gives Rating of this Course...");
      toast.dismiss(toastId);
    }
    catch(error){
      toast.error("Server error, check carefully..");
      toast.dismiss(toastId);
    }
    finally{
      toast.dismiss(toastId);
    }
    setRatingReviewModal(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-opacity-5 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button onClick={() => setRatingReviewModal(false)}>
            <RxCross1 className="text-2xl text-richblack-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            <div>
              <p className="font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <Stack spacing={1}>
              <Rating
                name="size-large"
                onChange={ratingChanged}
                defaultValue={2}
                size="large"
              />
            </Stack>
            <div className="flex w-11/12 flex-col space-y-2">
              <label className="text-sm text-richblack-5" htmlFor="review">
                Add Your Review <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="review"
                placeholder="Add Your Review"
                {...register("review", { required: true })}
                className="form-style min-h-[130px] w-full"
              />
              {errors.review && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Please Add Your Review
                </span>
              )}
            </div>
            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                onClick={() => setRatingReviewModal(false)}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center bg-yellow-50 px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RatingAndReviewModal;
