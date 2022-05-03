import Reading from "../models/reading.js"

//Get latest reading from database.
export const getCurrentData = async (req, res) => {
    try {
        const data = await Reading.find().sort({ _id: -1 }).limit(1);
        const { date, VOC, CO2 } = data[0]
        const currentData = {
            date,
            VOC,
            CO2
        }
        res.status(200).json(currentData);
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}

//Get data in timespan - -- - -

//Add a reading to the database
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