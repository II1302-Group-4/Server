import { getLatestReading, addNewReading, getAllWithinTimespan } from "./dataDb.js";
import { calculateHourlyAverage, getStartAndEndTimeStamp } from "./calculations.js";

/**
 * Gets the latest reading by calling the database module.
 * @returns The latest reading as a readingDAO object.
 */
export const getCurrentData = async () => {
    const data = await getLatestReading();
    const { time, VOC, CO2 } = data[0]
    const readingDAO = {
        time,
        VOC,
        CO2
    }
    return readingDAO;
}

/**
 * Gets the data for the last 24 hours from the database and averages it.
 * The result has 24 data points.
 * @returns The averaged data.
 */
export const getHistoricData = async () => {

    //Demo implementation with mocked data. Will get all data in the timespan 
    //2021-05-15T01:30 - 2021-05-16T01:30 GMT+2 or
    //2021-05-14T23:30 - 2021-05-15T23:30 GMT
    // const { startTime, endTime } = getStartAndEndTimeStamp(new Date("2021-05-16"))

    //Real implementation
    const { startTime, endTime } = getStartAndEndTimeStamp(new Date())

    const data = await getAllWithinTimespan(startTime, endTime);
    const result = calculateHourlyAverage(startTime, endTime, data)
    return result;
}

/**
 * Adds a new reading to the database by calling the database module.
 * @param body The body of the POST HTTP request.
 * @returns The reading added to the database if the input is correctly formatted, otherwise null.
 */
export const addNewData = async (body) => {
    if (body.VOC && body.CO2 && body.time) {
        if (body.time <= 0) throw Error("Time is non-positive")
        const { VOC, CO2, time } = body
        const readingDAO = { VOC, CO2, time }
        const newReading = await addNewReading(readingDAO)
        return newReading;
    }
    else {
        return null;
    }
}
