import Reading from "./models/reading.js";

/**
 * Attempts to get the most recently added reading from the database.
 * Relies on the documents being indexed by their "_id".
 * @returns The most recently added document from the database.
 */
export const getLatestReading = async () => {
    const latestReading = await Reading.find().sort({ _id: -1 }).limit(1);
    return latestReading;
}

/**
 * Attempts to get all the documents from the database within the specified timespan, including the start and end.
 * @param startTimeStamp The beginning of the timespan.
 * @param endTimeStamp The end of the timespan.
 * @returns All the documents within the specified timespan.
 */
export const getAllWithinTimespan = async (startTimeStamp, endTimeStamp) => {
    const readings = await Reading.find(
        { time: { $gte: startTimeStamp, $lte: endTimeStamp } }
    )
    return readings;
}

/**
 * Attempts to create a new reading document and save it to the database.
 * @param data The data from which the document is created.
 * @returns The newly created document.
 */
export const addNewReading = async (readingDAO) => {
    if (!readingDAO) return;
    const newReading = new Reading(readingDAO)
    await newReading.save();
    return newReading;
}
