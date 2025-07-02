import React, { useState } from "react";
import ThumbnailUploader from "./ThumbnailUploader";
import { getallcategory } from "../../../../../services/opreation/categoryAPI";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { createCourse } from "../../../../../services/opreation/courseAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCourse, setCourseId } from "../../../../../app/slice/courseSlice";

const CourseInformation = () => {
  const [courseInformation, setCourseInformation] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    tag: "",
    whatWeLearn: "",
    instruction: "",
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [category, setCategory] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getallcategory();

        if (response) {
          setCategory(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategory();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseInformation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", courseInformation.title);
    formData.append("description", courseInformation.description);
    formData.append("price", courseInformation.price);
    formData.append("category", courseInformation.category);
    formData.append("tag", courseInformation.tag);
    formData.append("whatWeLearn", courseInformation.whatWeLearn);
    formData.append("instruction", courseInformation.instruction);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    for (let pair of formData.entries()) {
      console.log(pair[0] + ":", pair[1]);
    }

    const toastId = toast.loading("Please Wait.....");
    try {
      const response = await createCourse(formData, token);
      if (!response) {
        throw new Error("Error not gives response");
      }

      dispatch(setCourse(response));
      dispatch(setCourseId(response._id));
      toast.success("Course Create Success");
      navigate("/dashboard/add-section");

    } catch (err) {
      console.log(err);
      toast.error("Course create Error");
    }
    toast.dismiss(toastId);
  };

  return (
    <div className="flex flex-col gap-4 w-[55%]">
      <h2 className="text-lg font-semibold font-inter text-richblack-300">
        Stage 01: Course Information
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-richblack-800 flex flex-col gap-3 px-8 py-4 rounded-xl"
      >
        <div className=" flex flex-col gap-2">
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={courseInformation.title}
            onChange={handleChange}
            placeholder="Enter course title"
            className="w-full mt-5 px-4 py-3 bg-richblack-700 text-white placeholder:text-richblack-300 border border-richblack-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
          />
        </div>

        <div className=" flex flex-col gap-2">
          <label htmlFor="description">Description*</label>
          <textarea
            id="description"
            name="description"
            value={courseInformation.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows={8}
             className="w-full mt-5 px-4 py-3 bg-richblack-700 text-white placeholder:text-richblack-300 border border-richblack-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
          ></textarea>
        </div>

        <div className=" flex flex-col gap-2">
          <label htmlFor="price">Price*</label>
          <input
            type="number"
            id="price"
            name="price"
            value={courseInformation.price}
            onChange={handleChange}
            placeholder="₹ 0"
            className=" no-spinner w-full mt-5 px-4 py-3 bg-richblack-700 text-white placeholder:text-richblack-300 border border-richblack-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="category" className="text-sm text-richblack-200">
            Course Category <sup className="text-pink-200">*</sup>
          </label>
          <select
            id="category"
            name="category"
            value={courseInformation.category}
            onChange={handleChange}
             className="w-full mt-5 px-4 py-3 bg-richblack-700 text-white placeholder:text-richblack-300 border border-richblack-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
          >
            <option value="">Select a category</option>
            {category.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className=" flex flex-col gap-2">
          <label htmlFor="tag">Tags</label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={courseInformation.tag}
            onChange={handleChange}
            placeholder="e.g., JavaScript, React"
            className="w-full mt-5 px-4 py-3 bg-richblack-700 text-white placeholder:text-richblack-300 border border-richblack-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
          />
        </div>

        <div className=" flex flex-col gap-2">
          <label htmlFor="whatWeLearn">What you'll learn</label>
          <textarea
            id="whatWeLearn"
            name="whatWeLearn"
            value={courseInformation.whatWeLearn}
            onChange={handleChange}
            rows={8}
            placeholder="Skills or benefits of the course"
            className="w-full mt-5 px-4 py-3 bg-richblack-700 text-white placeholder:text-richblack-300 border border-richblack-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
          ></textarea>
        </div>

        <div className=" flex flex-col gap-2">
          <label htmlFor="instruction">Instructions</label>
          <textarea
            id="instruction"
            name="instruction"
            value={courseInformation.instruction}
            onChange={handleChange}
            placeholder="Add any instructions"
           className="w-full mt-5 px-4 py-3 bg-richblack-700 text-white placeholder:text-richblack-300 border border-richblack-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
          ></textarea>
        </div>

        <div className=" flex flex-col gap-2">
          <ThumbnailUploader onFileSelect={(file) => setThumbnail(file)} />
        </div>

        <button
          type="submit"
          className="bg-yellow-50 hover:bg-yellow-100 text-black w-fit ml-auto font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default CourseInformation;
