import express from 'express'
import { getCurrentData, addNewData } from "../controller.js"

const router = express.Router();

/**
 * Handles a HTTP GET request to the "<base_URL>/data" endpoint.
 * Checks the origin of the request to assure that it has the expected source.
 * Will call the controller which in turn calls the database to get the latest readingDAO.
 */
router.get("/", async (req, res) => {
    const origin = req.headers.origin
    if (origin !== "http://localhost:3000" && origin !== "https://pollusense.azurewebsites.net") {
        return res.status(403).json("Restricted")
    }
    try {
        const currentData = await getCurrentData();
        return res.status(200).json(currentData)
    }
    catch (err) {
        return res.status(404).json(err)
    }
});

/**
 * Handles a HTTP POST request to the "<base_URL>/data" endpoint.
 * Checks that the body of the request includes the needed parameters.
 * Will call the controller which in turn calls the database to add the new readingDAO to the database.
 */
router.post("/", async (req, res) => {
    if (!req.body.VOC || !req.body.CO2 || !req.body.time) {
        return res.status(409).json({ error: "Need to include correct parameters." })
    }
    else {
        try {
            const newReading = await addNewData(req.body)
            res.removeHeader("Access-Control-Allow-Origin")
            res.removeHeader("Connection")
            res.removeHeader("Keep-Alive")
            res.removeHeader("Content-Length")
            res.removeHeader("Transfer-Encoding")
            res.removeHeader("X-Powered-By")
            res.setHeader("Date", "")
            return res.status(201).json()
        }
        catch (err) {
            return res.status(409).json(err)
        }
    }
})

export default router;