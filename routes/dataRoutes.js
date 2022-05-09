import express from 'express'
import { getCurrentData, addNewData } from "../controllers/dataController.js"

const router = express.Router();

//Endpoint for getting the latest reading, GET "../data"

router.get("/", async (req, res) => {
    try {
        const currentData = await getCurrentData();
        return res.status(200).json(currentData)
    }
    catch (err) {
        return res.status(404).json(err)
    }
});

//Endpoint for adding a reading, POST "../data"
router.post("/", async (req, res) => {
    if (!req.body.VOC || !req.body.CO2 || !req.body.time) {
        return res.status(409).json({ error: "Need to include correct parameters." })
    }
    else if (!req.body.VOC.value || !req.body.VOC.unit) {
        return res.status(409).json({ error: "VOC parameter needs to include the fields value and unit." })
    }
    else if (!req.body.CO2.value || !req.body.CO2.unit) {
        return res.status(409).json({ error: "CO2 parameter needs to include the fields value and unit." })
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