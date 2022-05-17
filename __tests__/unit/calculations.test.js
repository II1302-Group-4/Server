import * as calculations from "../../calculations.js"

/**
 * 
 */
describe("The getTimeStampNearestHalfHourRoundedDown() function", () => {
    test("return the correct timestamp with correct input data where the time is past half past", () => {
        const date = new Date("2022-05-13T12:31");
        const timestamp = calculations.getTimeStampNearestHalfHourRoundedDown(date)
        const expectedTimestamp = Math.floor(new Date("2022-05-13T12:30").getTime() / 1000)
        expect(timestamp).toBe(expectedTimestamp)
    })
    test("return the correct timestamp with correct input data where the time is before half past", () => {
        const date = new Date("2022-05-13T12:29");
        const timestamp = calculations.getTimeStampNearestHalfHourRoundedDown(date)
        const expectedTimestamp = Math.floor(new Date("2022-05-13T11:30").getTime() / 1000)
        expect(timestamp).toBe(expectedTimestamp)
    })
    test("returns null if the input data is not a Date object", () => {
        const input = 3
        const timestamp = calculations.getTimeStampNearestHalfHourRoundedDown(input)
        expect(timestamp).toBe(null)
    })
    test("returns null if no input data is given", () => {
        const input = null
        const timestamp = calculations.getTimeStampNearestHalfHourRoundedDown(input)
        expect(timestamp).toBe(null)
    })
})

// describe("The getCorrectTime() function", () => {
//     test("returns the correct date object with correct input data where the time is past half past", () => {
//         const timestamp = Math.floor(new Date("2022-05-13T12:31") / 1000)
//         const reading = { VOC: 1, CO2: 2, time: timestamp }
//         const time = calculations.getCorrectTime(reading)
//         expect(time).toStrictEqual(new Date("2022-05-13T13:00"))
//     })
//     test("returns the correct date object with correct input data where the time is before half past", () => {
//         const timestamp = Math.floor(new Date("2022-05-13T12:29") / 1000)
//         const reading = { VOC: 1, CO2: 2, time: timestamp }
//         const time = calculations.getCorrectTime(reading)
//         expect(time).toStrictEqual(new Date("2022-05-13T12:00"))
//     })
//     test("returns null if the input does not have a time field", () => {
//         const reading = { VOC: 1, CO2: 2 }
//         const time = calculations.getCorrectTime(reading)
//         expect(time).toBe(null)
//     })
//     test("returns null if there is no input", () => {
//         const time = calculations.getCorrectTime(null)
//         expect(time).toBe(null)
//     })
// })

/**
 * 
 */
describe("The getStartAndEndTimeStamp() function", () => {
    test("returns the correct timestamps with correct input", () => {
        const input = new Date("2022-05-13T12:00")
        const { startTime, endTime } = calculations.getStartAndEndTimeStamp(input)
        expect(endTime).toBe(Math.floor(new Date("2022-05-13T11:30") / 1000))
        expect(startTime).toBe(Math.floor(new Date("2022-05-12T11:30") / 1000))
    })
    test("returns null if the input is not a date object", () => {
        const { startTime, endTime } = calculations.getStartAndEndTimeStamp(5)
        expect(endTime).toBe(null)
        expect(startTime).toBe(null)
    })
    test("returns null if there is no input", () => {
        const { startTime, endTime } = calculations.getStartAndEndTimeStamp()
        expect(endTime).toBe(null)
        expect(startTime).toBe(null)
    })
})

/**
 * 
 */
describe("The calculateHourlyAverage() function", () => {
    let data;
    beforeEach(() => {
        data = [
            //hour 1
            {
                time: 0,
                VOC: 1,
                CO2: 1
            },
            {
                time: 1,
                VOC: 2,
                CO2: 2
            },
            {
                time: 2,
                VOC: 3,
                CO2: 3
            },
            //hour 2
            {
                time: 3600,
                VOC: 1,
                CO2: 2
            },
            //3
            {
                time: 7200,
                VOC: 1,
                CO2: 2
            },
            //4
            {
                time: 10800,
                VOC: 1,
                CO2: 2
            },
            //5
            {
                time: 14400,
                VOC: 1,
                CO2: 2
            },
            //6
            {
                time: 18000,
                VOC: 1,
                CO2: 2
            },
            //7
            {
                time: 21600,
                VOC: 1,
                CO2: 2
            },
            //8
            {
                time: 25200,
                VOC: 1,
                CO2: 2
            },
            //9
            {
                time: 28800,
                VOC: 1,
                CO2: 2
            },
            //10
            {
                time: 32400,
                VOC: 1,
                CO2: 2
            },
            //11
            {
                time: 36000,
                VOC: 1,
                CO2: 2
            },
            //12
            {
                time: 39600,
                VOC: 1,
                CO2: 2
            },
            //13
            {
                time: 43200,
                VOC: 1,
                CO2: 2
            },
            //14
            {
                time: 46800,
                VOC: 1,
                CO2: 2
            },
            //15
            {
                time: 50400,
                VOC: 1,
                CO2: 2
            },
            //16
            {
                time: 54000,
                VOC: 1,
                CO2: 2
            },
            //17
            {
                time: 57600,
                VOC: 1,
                CO2: 2
            },
            //18
            {
                time: 61200,
                VOC: 1,
                CO2: 2
            },
            //19
            {
                time: 64800,
                VOC: 1,
                CO2: 2
            },
            //20
            {
                time: 68400,
                VOC: 1,
                CO2: 2
            },
            //21
            {
                time: 72000,
                VOC: 1,
                CO2: 2
            },
            //22
            {
                time: 75600,
                VOC: 1,
                CO2: 2
            },
            //23
            {
                time: 79200,
                VOC: 1,
                CO2: 2
            },
            //24
            {
                time: 82800,
                VOC: 1,
                CO2: 2
            }
        ]
    })
    test("returns the correct values with sufficient input data", () => {
        const { startTime, endTime } = { startTime: 0, endTime: 86400 }
        const result = calculations.calculateHourly(startTime, endTime, data)
        expect(result.length).toBe(24)
        for (let i = 0; i < result.length; i++) {
            const relevantReadings = data.filter(d => d.time < (i + 1) * 3600 && d.time >= i * 3600)
            expect(result[i].VOC).toBe(relevantReadings.reduce((acc, d) => acc + d.VOC, 0) / relevantReadings.length)
            expect(result[i].CO2).toBe(relevantReadings.reduce((acc, d) => acc + d.CO2, 0) / relevantReadings.length)
            expect(result[i].time).toBe(1800 + i * 3600)
        }
    })
    test("returns the correct array even if the last hour does not have any readings", () => {
        const { startTime, endTime } = { startTime: 0, endTime: 86400 }
        data.splice(data.length - 1, 1)
        const result = calculations.calculateHourly(startTime, endTime, data)
        expect(result.length).toBe(24)
        expect(result[result.length - 1].VOC).toBe("No data")
        expect(result[result.length - 1].CO2).toBe("No data")
        expect(result[result.length - 1].time).toBe(endTime - 1800)
        for (let i = 0; i < result.length - 1; i++) {
            const relevantReadings = data.filter(d => d.time < (i + 1) * 3600 && d.time >= i * 3600)
            expect(result[i].VOC).toBe(relevantReadings.reduce((acc, d) => acc + d.VOC, 0) / relevantReadings.length)
            expect(result[i].CO2).toBe(relevantReadings.reduce((acc, d) => acc + d.CO2, 0) / relevantReadings.length)
            expect(result[i].time).toBe(1800 + i * 3600)
        }
    })
    test("returns the correct array even if an hour that is not first or last does not have any readings", () => {
        const { startTime, endTime } = { startTime: 0, endTime: 86400 }
        data.splice(data.length - 5, 1)
        const result = calculations.calculateHourly(startTime, endTime, data)
        expect(result.length).toBe(24)
        expect(result[result.length - 5].VOC).toBe("No data")
        expect(result[result.length - 5].CO2).toBe("No data")
        expect(result[result.length - 5].time).toBe(endTime - 4 * 3600 - 1800)
        for (let i = 0; i < result.length; i++) {
            if (i === result.length - 5) {
                continue
            }
            const relevantReadings = data.filter(d => d.time < (i + 1) * 3600 && d.time >= i * 3600)
            expect(result[i].VOC).toBe(relevantReadings.reduce((acc, d) => acc + d.VOC, 0) / relevantReadings.length)
            expect(result[i].CO2).toBe(relevantReadings.reduce((acc, d) => acc + d.CO2, 0) / relevantReadings.length)
            expect(result[i].time).toBe(1800 + i * 3600)
        }
    })
    test("returns the correct array even if the first hour does not have any readings", () => {
        const { startTime, endTime } = { startTime: 0, endTime: 86400 }
        data.splice(0, 3)
        const result = calculations.calculateHourly(startTime, endTime, data)
        expect(result.length).toBe(24)
        expect(result[0].VOC).toBe("No data")
        expect(result[0].CO2).toBe("No data")
        expect(result[0].time).toBe(startTime + 1800)
        for (let i = 1; i < result.length; i++) {
            const relevantReadings = data.filter(d => d.time < (i + 1) * 3600 && d.time >= i * 3600)
            expect(result[i].VOC).toBe(relevantReadings.reduce((acc, d) => acc + d.VOC, 0) / relevantReadings.length)
            expect(result[i].CO2).toBe(relevantReadings.reduce((acc, d) => acc + d.CO2, 0) / relevantReadings.length)
            expect(result[i].time).toBe(1800 + i * 3600)
        }
    })
    test("returns the correct array if several hours do not have any readings", () => {
        const { startTime, endTime } = { startTime: 0, endTime: 86400 }
        data.splice(data.length - 5, 1)
        data.splice(data.length - 8, 1)
        const result = calculations.calculateHourly(startTime, endTime, data)
        expect(result.length).toBe(24)
        expect(result[result.length - 5].VOC).toBe("No data")
        expect(result[result.length - 5].CO2).toBe("No data")
        expect(result[result.length - 5].time).toBe(endTime - 4 * 3600 - 1800)
        expect(result[result.length - 9].VOC).toBe("No data")
        expect(result[result.length - 9].CO2).toBe("No data")
        expect(result[result.length - 9].time).toBe(endTime - 8 * 3600 - 1800)
        for (let i = 0; i < result.length; i++) {
            if (i === result.length - 5 || i === result.length - 9) {
                continue
            }
            const relevantReadings = data.filter(d => d.time < (i + 1) * 3600 && d.time >= i * 3600)
            expect(result[i].VOC).toBe(relevantReadings.reduce((acc, d) => acc + d.VOC, 0) / relevantReadings.length)
            expect(result[i].CO2).toBe(relevantReadings.reduce((acc, d) => acc + d.CO2, 0) / relevantReadings.length)
            expect(result[i].time).toBe(1800 + i * 3600)
        }
    })
    test("returns the correct array if the first and last hours do not have any readings", () => {
        const { startTime, endTime } = { startTime: 0, endTime: 86400 }
        data.splice(0, 3)
        data.splice(data.length - 1, 1)
        const result = calculations.calculateHourly(startTime, endTime, data)
        expect(result.length).toBe(24)
        expect(result[0].VOC).toBe("No data")
        expect(result[0].CO2).toBe("No data")
        expect(result[0].time).toBe(1800)
        expect(result[result.length - 1].VOC).toBe("No data")
        expect(result[result.length - 1].CO2).toBe("No data")
        expect(result[result.length - 1].time).toBe(1800 + 3600 * 23)
        for (let i = 1; i < result.length - 1; i++) {
            const relevantReadings = data.filter(d => d.time < (i + 1) * 3600 && d.time >= i * 3600)
            expect(result[i].VOC).toBe(relevantReadings.reduce((acc, d) => acc + d.VOC, 0) / relevantReadings.length)
            expect(result[i].CO2).toBe(relevantReadings.reduce((acc, d) => acc + d.CO2, 0) / relevantReadings.length)
            expect(result[i].time).toBe(1800 + i * 3600)
        }
    })
    test("returns the correct string if there is no input data", () => {
        const { startTime, endTime } = { startTime: 0, endTime: 86400 }
        const result = calculations.calculateHourly(startTime, endTime, [])
        expect(result).toBe("No data for this timespan")
    })
    test("returns the string if the timespan is not 24 hours", () => {
        const { startTime, endTime } = { startTime: 0, endTime: 30000 }
        const result = calculations.calculateHourly(startTime, endTime, data)
        expect(result).toBe("Invalid timespan")
    })
})
