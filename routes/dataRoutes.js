import express from 'express'
import { getCurrentData, addReading } from "../controllers/data.js"
const router = express.Router();


//Endpoint for getting the latest reading, GET "../data"
router.get("/", getCurrentData);

//Endpoint for adding a reading, POST "../data"
router.post("/", addReading)

export default router;