import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const postReview = async (req, res) => {
  // console.log(req.body);
  let { doctor, user, comment, rating } = req.body;
  // console.log(new Date().toDateString())

  const newReview = new Review({
    doctor: doctor,
    user: user,
    comment: comment,
    rating: rating,
    posted: new Date().toDateString(),
  });

  const currUser = await User.findById(user);

  await newReview.save();

  const reviewedDoctor = await Doctor.findByIdAndUpdate(
    newReview.doctor,
    { $push: { reviews: newReview._id } },
    { new: true }
  );

  return res
    .status(200)
    .json({
      success: true,
      message: "Review Posted Successfully",
      review: newReview,
      reviewedDoctor: reviewedDoctor,
      reviewingUser : currUser
    });
};

export const getReviews = async (req, res) => {
  try {
    let { id } = req.body;
    const doctor = await Doctor.findById(id).populate({
      path: "reviews",
      options: { sort: { posted: -1 } },
      populate: { path: "user", select: "username photo" },
    });


    return res.status(200).json({ success: true, reviews: doctor.reviews });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const deleteReview = async (req, res) => {
  try {
    const { reviewId, doctorId } = req.body;

    await Review.findByIdAndDelete(reviewId);

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { $pull: { reviews: reviewId } },
      { new: true } // <-- Important: returns the updated document
    ).populate("reviews"); // Optional: if you want full review objects

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      reviews: updatedDoctor.reviews,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
