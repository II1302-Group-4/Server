import { getLatestReading, addNewReading } from "../db/dataDb.js";

//Get latest reading from database.
export const getCurrentData = async () => {
    const data = await getLatestReading();
    const { date, VOC, CO2 } = data[0]
    const dataObject = {
        date,
        VOC,
        CO2
    }
    return dataObject;
}

export const addNewData = async (body) => {
    if (body.VOC && body.CO2) {
        const { VOC, CO2 } = body
        const newReading = await addNewReading({ VOC, CO2 })
        return newReading;
    }
    else {
        return null;
    }
}


//Get data in timespan - -- - -
