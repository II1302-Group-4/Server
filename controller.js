import { getLatestReading, addNewReading, getAllWithinTimespan } from "./dataDb.js";
import { calculateHourly, getStartAndEndTimeStamp } from "./calculations.js";

/**
 * 
 * @returns 
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
 * 
 * @returns 
 */
export const getHistoricData = async () => {
    //Real implementation
    const { startTime, endTime } = getStartAndEndTimeStamp(new Date())

    //Demo implementation with mocked data. Will get all data in the timespan 2021-05-14T23:30 - 2021-05-15T23:30
    // const { startTime, endTime } = getStartAndEndTimeStamp(new Date("2021-05-16"))
    const data = await getAllWithinTimespan(startTime, endTime);
    const result = calculateHourly(startTime, endTime, data)
    return result;
}

/**
 * 
 * @param {*} body 
 * @returns 
 */
export const addNewData = async (body) => {
    if (body.VOC && body.CO2 && body.time) {
        const { VOC, CO2, time } = body
        const readingDAO = { VOC, CO2, time }
        const newReading = await addNewReading(readingDAO)
        return newReading;
    }
    else {
        return null;
    }
}
