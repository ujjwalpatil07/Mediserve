import React, { useEffect, useState } from "react";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { Button } from "@mui/material";
import { useUserAuth } from "../../../context/AuthProvider";
import ReviewDash from "./ReviewDash";
import ReviewCard from "./ReviewCard";
import axios from "axios";
import { useSetTheme } from "../../../context/ThemeProvider";

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function D_Reviews({doctor}) {
  const [authUser] = useUserAuth();
  const [hover, setHover] = useState(-1);
  const [refreshKey, setRefreshKey] = useState(0);
  const [currTheme] = useSetTheme();

  const [review, setReview] = useState({
    doctor : doctor._id,
    user : authUser._id,
    comment: "",
    rating: 0,
  })

  const handlePostReview = async (e) => {
    e.preventDefault()
    console.log("Review posted")

    await axios
      .post("http://localhost:4001/review/post_review", review)
      .then((res) => {
        console.log(res.data)
        setRefreshKey(prev => prev + 1);
      })
      .catch((err) => {
        console.log(err)
      })


    setReview({
      doctor: doctor._id,
      user: authUser._id,
      comment: "",
      rating: 0
    });

  }

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setReview((prevData) => ({
      ...prevData,
      [name]: value
    }
    ));

  }
  return (
    <div className="my-8 w-full px-4 md:px-10">
      <h1
        className={`text-3xl font-serif font-bold mb-4 text-center md:text-left ${currTheme === "dark" ? "text-slate-100" : "text-gray-800"
          }`}
      >
        🗣️ Reviews
      </h1>

      {/* Review Form Container */}
      <div
        className={`w-full max-w-3xl mx-auto rounded-2xl shadow-md p-6 ${currTheme === "dark"
            ? "bg-slate-800 border border-slate-600"
            : "bg-gradient-to-br from-amber-50 to-blue-100 border border-gray-300"
          }`}
      >
        <form onSubmit={handlePostReview}>
          <div className="flex flex-col gap-4">
            <h2
              className={`text-xl font-semibold ${currTheme === "dark" ? "text-amber-300" : "text-gray-800"
                }`}
            >
              {authUser?.username?.toUpperCase()}
            </h2>

            {/* Textarea */}
            <textarea
              name="comment"
              id="comment"
              rows={5}
              value={review.comment}
              onChange={handleInputChange}
              placeholder="Write your review here..."
              className={`rounded-md p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${currTheme === "dark"
                  ? "bg-slate-800 text-slate-200 border border-slate-600 placeholder-slate-400"
                  : "bg-white text-gray-700 border border-gray-400 placeholder-gray-500"
                }`}
              required
            ></textarea>

            {/* Rating + Submit */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <Box sx={{ width: 200, display: "flex", alignItems: "center" }}>
                <Rating
                  name="rating"
                  value={review.rating}
                  precision={0.5}
                  getLabelText={getLabelText}
                  onChange={handleInputChange}
                  onChangeActive={(event, newHover) => setHover(newHover)}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
                {review.rating !== null && (
                  <Box
                    sx={{ ml: 2 }}
                    className={`font-medium ${currTheme === "dark" ? "text-slate-300" : "text-gray-700"
                      }`}
                  >
                    {labels[hover !== -1 ? hover : review.rating]}
                  </Box>
                )}
              </Box>

              <Button
                variant="outlined"
                color="primary"
                className={`!mt-2 sm:!mt-0 !w-fit font-semibold border-2 transition
    ${currTheme === "dark"
                    ? "!text-amber-400 !border-amber-400 hover:!bg-amber-400 hover:!text-gray-800"
                    : "!text-blue-700 hover:!bg-blue-100 hover:!text-blue-900"}`}
                type="submit"
              >
                Share your experience
              </Button>
            </div>
          </div>
        </form>
      </div>



      {/* Dashboard & Review Cards */}
      <div className="mt-10">
        <ReviewDash />
        <ReviewCard d_id={doctor._id} refreshTrigger={refreshKey} />
      </div>
    </div>

  );
}
