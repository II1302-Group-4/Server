import express from 'express'
import { getCurrentData } from "../controllers/data.js"
const router = express.Router();

router.get("/", getCurrentData);
export default router;