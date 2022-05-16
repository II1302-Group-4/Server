import { bin } from "d3-array"


// const timey = (date) => {
//     date.setHours(date.getHours() - 2)
//     let sum = 0
//     sum = sum + (date.getFullYear() - 1970) * (60 * 60 * 24 * 365.25)
//     sum = sum + (date.getDate() - 1) * (60 * 60 * 24)
//     sum = sum + (date.getHours()) * (60 * 60)
//     sum = sum + (date.getMinutes()) * (60)
//     sum = sum + (date.getSeconds())
//     sum = sum + (31 + 28 + 31 + 30) * (60 * 60 * 24)
//     return sum
// }

/**
 * 
 * @param {*} date 
 * @returns 
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

// export const getCorrectTime = (reading) => {
//     if (reading && reading.time) {
//         const date = new Date(reading.time * 1000)
//         if (date.getMinutes() < 30) {
//             date.setMinutes(0)
//         } else {
//             date.setHours(date.getHours() + 1)
//             date.setMinutes(0)
//         }
//         date.setSeconds(0)
//         return date
//     }
//     return null;
// }

/**
 * 
 * @param {*} date 
 * @returns 
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
 * @param {*} startTime 
 * @param {*} endTime 
 * @param {*} data 
 * @returns 
 */
export const calculateHourlyAverage = (startTime, endTime, data) => {
    data = data.filter(d => d.time <= endTime && d.time >= startTime)
    let thresholds = []
    for (let i = startTime + 3600; i < endTime; i = i + 3600) {
        thresholds.push(i)
    }
    const binFunction =
        bin()
            .value(d => d.time)
            .thresholds(thresholds)

    const binnedData = binFunction(data)

    const reducer = (array) => {
        const t = array.reduce((acc, e) => acc + e.VOC, 0)
        const s = array.reduce((acc, e) => acc + e.CO2, 0)
        return {
            VOC: t / array.length, CO2: s / array.length, time: (binnedData[binnedData.indexOf(array)].x0 + 1800)
        }
    }
    const result = binnedData.map((e) => reducer(e))
    if (binnedData[binnedData.length - 1].x0 !== startTime + 3600 * 23) {
        result.push({ VOC: NaN, CO2: NaN, time: startTime + 3600 * 23 + 1800 })
        binnedData.push({ x0: startTime + 3600 * 23, x1: startTime + 3600 * 23 + 1800 })
    }
    if (binnedData[0].x0 !== startTime) {
        result.unshift({ VOC: NaN, CO2: NaN, time: startTime + 1800 })
        binnedData.unshift({ x0: startTime, x1: startTime + 3600 })

    }
    return { binnedData, result }
}