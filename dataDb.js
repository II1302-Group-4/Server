import Reading from "./models/reading.js";

/**
 * 
 * @returns 
 */
export const getLatestReading = async () => {
    const latestReading = await Reading.find().sort({ _id: -1 }).limit(1);
    return latestReading;
}

/**
 * 
 * @param {*} startTimeStamp 
 * @param {*} endTimeStamp 
 * @returns 
 */
export const getAllWithinTimespan = async (startTimeStamp, endTimeStamp) => {
    const readings = await Reading.find(
        { time: { $gte: startTimeStamp, $lte: endTimeStamp } }
    )
    return readings;
}

/**
 * 
 * @param {*} data 
 * @returns 
 */
export const addNewReading = async (data) => {
    if (!data) return;
    const newReading = new Reading(data)
    await newReading.save();
    return newReading;
}
