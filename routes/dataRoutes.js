import express from 'express'
import { getCurrentData, addNewData } from "../controllers/dataController.js"

const router = express.Router();

//Endpoint for getting the latest reading, GET "../data"

router.get("/", async (req, res) => {
    try {
        const currentData = await getCurrentData();
        res.status(200).json(currentData)
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }
});

//Endpoint for adding a reading, POST "../data"
router.post("/", async (req, res) => {
    if (!req.body.VOC || !req.body.CO2) {
        res.status(409).json({ message: req.body })
    }
    else if (!req.body.VOC.value || !req.body.VOC.unit) {
        res.status(409).json({ error: "VOC parameter needs to include the fields value and unit." })
    }
    else if (!req.body.CO2.value || !req.body.CO2.unit) {
        res.status(409).json({ error: "CO2 parameter needs to include the fields value and unit." })
    }
    else {
        try {
            const newReading = await addNewData(req.body)
            res.status(201).json(newReading)
        }
        catch (err) {
            res.status(409).json({ error: err.message })
        }
    }
})

export default router;