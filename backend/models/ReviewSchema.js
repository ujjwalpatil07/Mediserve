import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 0,
    },
    posted : {
      type : String,
      required : true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Review", ReviewSchema);