
/**
 * Takes a date object and returns the unix timestamp corresponding to the nearest xx:30 mark rounded down.
 * Example: 
 * Date object corresponding to 2022-05-15T23:29 gives the timestamp corresponding to 2022-05-15T22:30
 * Date object corresponding to 2022-05-15T23:31 gives the timestamp corresponding to 2022-05-15T23:30
 * 
 * @param date The date object.
 * @returns The unix timestamp without milliseconds if the input is a Date object, otherwise null.
 */
export const getTimeStampNearestHalfHourRoundedDown = (date) => {
    if (date instanceof Date) {
        const minutes = date.getMinutes();
        if (minutes > 30) {
            date.setMinutes(30)
        } else {
            date.setHours(date.getHours() - 1)
            date.setMinutes(30)
        }
        date.setSeconds(0)
        return Math.floor(date.getTime() / 1000)
    }
    return null;
}

/**
 * Takes a date object and returns an object with two timestamps twenty four hours apart.
 * The later timestamp is the given date objects nearest half hour rounded down.
 * The other one is twenty four hours before that.
 * @param date The date object from which the timestamps are derived.
 * @returns An object with two timestamps if the input is a date object, otherwise null.
 */
export const getStartAndEndTimeStamp = (date) => {
    if (date instanceof Date) {
        const endTime = getTimeStampNearestHalfHourRoundedDown(date)
        const startTime = endTime - 86400
        return { startTime, endTime }
    }
    return { startTime: null, endTime: null }
}

/**
 * 
 * @param startTime 
 * @param endTime 
 * @param data 
 * @returns The averaged data. 
 * If there is no input data, the data is empty or the given startTime is not 24 hours earlier 
 * than the given endTime a String describing this is returned.
 */
export const calculateHourlyAverage = (startTime, endTime, data) => {
    if (!data || data.length === 0) {
        return "No data for this timespan"
    }
    if (endTime <= startTime || (endTime - startTime) / 3600 !== 24) {
        return "Invalid timespan"
    }
    let result = []
    let bins = []
    for (let i = 0; i < (endTime - startTime) / 3600; i++) {
        bins[i] = { readings: [], start: startTime + i * 3600, end: startTime + (i + 1) * 3600 }
        result[i] = { VOC: 0, CO2: 0, time: startTime + 1800 + i * 3600 }
    }
    for (let j = 0; j < data.length; j++) {
        for (let k = 0; k < bins.length; k++) {
            if (data[j].time < bins[k].end && data[j].time >= bins[k].start) {
                bins[k].readings.push(data[j])
            }
        }
    }
    for (let l = 0; l < bins.length; l++) {
        for (let m = 0; m < bins[l].readings.length; m++) {
            result[l].VOC = result[l].VOC + bins[l].readings[m].VOC
            result[l].CO2 = result[l].CO2 + bins[l].readings[m].CO2
        }
        if (bins[l].readings.length > 0) {
            result[l].VOC = result[l].VOC / bins[l].readings.length
            result[l].CO2 = result[l].CO2 / bins[l].readings.length
        } else {
            result[l].VOC = "No data"
            result[l].CO2 = "No data"
        }
    }
    return result
}