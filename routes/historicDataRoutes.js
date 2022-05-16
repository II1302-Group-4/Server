import express from 'express'
import { getHistoricData } from '../controller.js';

const router = express.Router();

/**
 * 
 */
router.get("/", async (req, res) => {
    const origin = req.headers.origin
    if (origin !== "http://localhost:3000" && origin !== "https://pollusense.azurewebsites.net") {
        return res.status(403).json("Restricted")
    }
    try {
        const data = await getHistoricData();
        return res.status(200).json(data)
    }
    catch (err) {
        return res.status(404).json(err.message)
    }
})

export default router;