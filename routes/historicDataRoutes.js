import express from 'express'
import { getHistoricData } from '../controller.js';

const router = express.Router();

/**
 * Handles a HTTP GET request to the "<base_URL>/history" endpoint.
 * Checks the origin of the request to assure that it has the expected source.
 * Will call the controller which in turn calls the database and the calculations module to return 
 * the averaged data for the last 24 hours.
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