import express from 'express'
import { getCurrentData, addNewData } from "../controller.js"

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
        const currentData = await getCurrentData();
        return res.status(200).json(currentData)
    }
    catch (err) {
        return res.status(404).json(err)
    }
});

/**
 * 
 */
router.post("/", async (req, res) => {
    if (!req.body.VOC || !req.body.CO2 || !req.body.time) {
        return res.status(409).json({ error: "Need to include correct parameters." })
    }
    else {
        try {
            const newReading = await addNewData(req.body)
            return res.status(201).json(newReading)
        }
        catch (err) {
            return res.status(409).json(err)
        }
    }
})

export default router;