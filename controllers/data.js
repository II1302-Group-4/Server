
import Reading from "../models/reading.js"

export const getCurrentData = async (req, res) => {
    try {
        const data = await Reading.find().sort({ _id: -1 }).limit(1);
        const { date, chemical, value } = data[0]
        const currentData = {
            date: date,
            chemical: chemical,
            value: value
        }
        res.status(200).json(currentData);
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const addReading = async (req, res) => {
    const data = req.body
    const newReading = new Reading(data)
    try {
        await newReading.save();
        res.status(201).json(newReading)
    }
    catch (err) {
        res.status(409).json({ message: err.message })
    }
}