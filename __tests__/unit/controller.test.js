import * as controller from "../../controller.js";
import * as dataDb from "../../dataDb.js"
import * as calculations from "../../calculations.js"

describe("The getCurrentData() function", () => {
    let readings;
    beforeAll(() => {
        readings = [
            {
                id: 1,
                VOC: 100,
                CO2: 250,
                time: 1652120680
            },
            {
                id: 2,
                VOC: 150,
                CO2: 350,
                time: 1652120682
            }
        ]
        dataDb.getLatestReading = jest.fn(() => [readings[readings.length - 1]]);
    })
    test("gets the latest reading", async () => {
        const currentData = await controller.getCurrentData();
        expect(currentData.VOC).toBe(150)
        expect(currentData.CO2).toBe(350)
        expect(currentData.time).toBe(1652120682)

    })
})

describe("The addNewData() function", () => {
    let readings;
    beforeAll(() => {
        dataDb.addNewReading = jest.fn((newReading) => {
            readings.push(newReading)
            return {
                ...newReading,
                id: 3
            }
        });
    })
    beforeEach(() => {
        readings = [
            {
                id: 1,
                time: 1652120683,
                VOC: 100,
                CO2: 250
            },
            {
                id: 2,
                time: 1652120684,
                VOC: 150,
                CO2: 350
            }
        ]
    })
    test("with correct input data", async () => {
        const readingToAdd = {
            VOC: 200,
            CO2: 400,
            time: 1652120679
        }
        const newReadingFromDatabase = await controller.addNewData(readingToAdd)
        expect(newReadingFromDatabase.VOC).toBe(200)
        expect(newReadingFromDatabase.CO2).toBe(400)
        expect(newReadingFromDatabase.time).toBe(1652120679)
        expect(newReadingFromDatabase.id).toBe(3)
        expect(readings.length).toBe(3)
    })
    test("with incorrect input data", async () => {
        const readingToAdd = {
            VOC: 200
        }
        const newReadingFromDatabase = await controller.addNewData(readingToAdd)
        expect(newReadingFromDatabase).toBe(null)
        expect(readings.length).toBe(2)
    })
})

describe("The getHistoricData() function", () => {
    let data;
    beforeAll(() => {
        dataDb.getAllWithinTimespan = jest.fn((startTime, endTime) => {
            return data.filter(r => r.time >= startTime && r.time <= endTime)
        })
        calculations.getStartAndEndTimeStamp = jest.fn(() => {
            const startTime = Math.floor(new Date("2022-05-12").getTime() / 1000)
            const endTime = startTime + 24 * 3600
            return { startTime, endTime }
        })
    })
    beforeEach(() => {
        data = [
            //hour 1
            {
                time: 1652313600,
                VOC: 1,
                CO2: 1
            },
            {
                time: 1652313601,
                VOC: 2,
                CO2: 2
            },
            {
                time: 1652313602,
                VOC: 3,
                CO2: 3
            },
            //hour 2
            {
                time: 1652317200,
                VOC: 1,
                CO2: 2
            },
            //3
            {
                time: 1652320800,
                VOC: 1,
                CO2: 2
            },
            //4
            {
                time: 1652324400,
                VOC: 1,
                CO2: 2
            },
            //5
            {
                time: 1652328000,
                VOC: 1,
                CO2: 2
            },
            //6
            {
                time: 1652331600,
                VOC: 1,
                CO2: 2
            },
            //7
            {
                time: 1652335200,
                VOC: 1,
                CO2: 2
            },
            //8
            {
                time: 1652338800,
                VOC: 1,
                CO2: 2
            },
            //9
            {
                time: 1652342400,
                VOC: 1,
                CO2: 2
            },
            //10
            {
                time: 1652346000,
                VOC: 1,
                CO2: 2
            },
            //11
            {
                time: 1652349600,
                VOC: 1,
                CO2: 2
            },
            //12
            {
                time: 1652353200,
                VOC: 1,
                CO2: 2
            },
            //13
            {
                time: 1652356800,
                VOC: 1,
                CO2: 2
            },
            //14
            {
                time: 1652360400,
                VOC: 1,
                CO2: 2
            },
            //15
            {
                time: 1652364000,
                VOC: 1,
                CO2: 2
            },
            //16
            {
                time: 1652367600,
                VOC: 1,
                CO2: 2
            },
            //17
            {
                time: 1652371200,
                VOC: 1,
                CO2: 2
            },
            //18
            {
                time: 1652374800,
                VOC: 1,
                CO2: 2
            },
            //19
            {
                time: 1652378400,
                VOC: 1,
                CO2: 2
            },
            //20
            {
                time: 1652382000,
                VOC: 1,
                CO2: 2
            },
            //21
            {
                time: 1652385600,
                VOC: 1,
                CO2: 2
            },
            //22
            {
                time: 1652389200,
                VOC: 1,
                CO2: 2
            },
            //23
            {
                time: 1652392800,
                VOC: 1,
                CO2: 2
            },
            //24
            {
                time: 1652396400,
                VOC: 1,
                CO2: 2
            },
            //Outside span
            {
                time: 1652400001,
                VOC: 150,
                CO2: 350
            }
        ]
    })
    test("with raw data where every hour has measurements.", async () => {
        const averagedData = await controller.getHistoricData()
        expect(averagedData.length).toBe(24)
    })
    test("with raw data where not every hour has measurements.", async () => {
        const averagedData = await controller.getHistoricData()
        expect(averagedData.length).toBe(24)
    })
})



