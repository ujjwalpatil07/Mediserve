import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import patientReviews from "../../../assets/data/reviews";
import { useUserAuth } from "../../../context/AuthProvider";
import axios from "axios";
import { useSetTheme } from "../../../context/ThemeProvider";

export default function ReviewCard({ d_id, refreshTrigger }) {
  const [authUser] = useUserAuth()
  const [isExpanded, setIsExpanded] = useState(false);
  const [currDoctorReviews, setCurrDoctorReviews] = useState([]);
  const [currTheme] = useSetTheme()

  const visibleReviews = isExpanded ? currDoctorReviews : currDoctorReviews.slice(0, 3);

  useEffect(() => {
    try {
      const getReviewsForCurrDoctor = async () => {
        const response = await axios.post("http://localhost:4001/reviews/get_reviews", { id: d_id })
        setCurrDoctorReviews(response.data.reviews)
      }
      getReviewsForCurrDoctor();
    } catch (error) {
      console.log(error)
    }
  }, [d_id, refreshTrigger])

  const handleDeleteReview = async (id) => {
    try {
      await axios.post("http://localhost:4001/review/delete_review", { reviewId: id, doctorId: d_id });

      // Refetch the updated reviews with populated user
      const response = await axios.post("http://localhost:4001/reviews/get_reviews", { id: d_id });
      setCurrDoctorReviews(response.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      {visibleReviews.map((review, id) => (
        <div
          key={id}
          className={`w-full border p-4 my-3 group rounded-xl shadow-lg transition-all duration-300 ease-in-out 
        ${currTheme === "light"
              ? "bg-white border-gray-200 hover:bg-gray-100"
              : "bg-slate-800 border-slate-700 hover:bg-slate-700"}`}
        >
          <div className="flex items-center justify-between px-4 mb-3">
            <div className="flex items-center">
              <img
                src={review.user?.photo}
                alt="User"
                className="w-12 h-12 me-4 ms-2 rounded-full object-cover"
              />
              <div>
                <h3
                  className={`text-lg font-semibold ${currTheme === "light" ? "text-gray-800" : "text-amber-400"}`}
                >
                  {review.user?.username || "User Name"}
                </h3>
                <h4 className={`text-gray-600 ${currTheme === "dark" ? "text-slate-400" : ""}`}>
                  {review.posted || "4 months ago"}
                </h4>
              </div>
            </div>
            <Rating
              name="size-medium"
              value={review.rating || 2}
              size="medium"
              readOnly
            />
          </div>

          <div className="px-4 flex justify-between items-center">
            <p className={`${currTheme === "light" ? "text-gray-700" : "text-slate-200"}`}>
              {review.comment || "Sample review comment goes here."}
            </p>

            {authUser._id === review.user._id && (
              <div
                className={`opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-96 transition-all duration-300 ease-in-out`}
              >
                <button
                  className={`border px-4 py-1 rounded cursor-pointer 
                ${currTheme === "dark"
                      ? "border-amber-400 text-slate-300 hover:bg-amber-400 hover:text-gray-700"
                      : "text-black hover:bg-red-500 hover:text-white"}`}
                  onClick={() => handleDeleteReview(review._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {currDoctorReviews.length > 3 && (
        <button
          className={`border p-2 rounded-2xl w-fit cursor-pointer mb-4 mx-auto font-semibold flex items-center justify-center 
        ${currTheme === "light"
              ? "text-gray-700 hover:bg-gray-200"
              : "text-slate-200 hover:bg-slate-700"} transition-all duration-300`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show Less" : "Load More"}
          <i className={`ms-3 fa-duotone ${isExpanded ? "fa-angles-up" : "fa-angles-down"}`}></i>
        </button>
      )}
    </>



  );
}
