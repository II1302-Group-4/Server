import express from 'express'
import { getCurrentData, addReading } from "../controllers/data.js"
const router = express.Router();

router.get("/", getCurrentData);
router.post("/", addReading)
export default router;