import wrapAsync from "../utils/wrapAsync.js";
const router = express.Router();
import { sendsms } from "../controllers/twilio.js";

router.post("/twilio", wrapAsync(sendsms))