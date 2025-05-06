import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { getReviews, postReview, deleteReview } from "../controllers/reviews.js";

const router = express.Router();

router.post("/review/post_review", wrapAsync(postReview));
router.post("/review/delete_review", wrapAsync(deleteReview));
router.post("/reviews/get_reviews", wrapAsync(getReviews))

export default router;