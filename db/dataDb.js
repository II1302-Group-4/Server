import Reading from "../models/reading.js";

export const getLatestReading = async () => {
    const latestReading = await Reading.find().sort({ _id: -1 }).limit(1);
    return latestReading;
}

export const addNewReading = async (data) => {
    if (!data) return;
    const newReading = new Reading(data)
    console.log(newReading)
    await newReading.save();
    return newReading;
}