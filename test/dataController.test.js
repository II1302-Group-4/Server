import * as dataController from "../controllers/dataController.js";
import * as dataDb from "../db/dataDb.js"


describe("The getCurrentData() function", () => {
    test("test", async () => {
        dataDb.getLatestReading = jest.fn(() => [readings[readings.length - 1]])
        const currentData = await dataController.getCurrentData();
        expect(currentData.VOC.value).toBe(150)
        expect(currentData.VOC.unit).toBe("ppb")
        expect(currentData.CO2.value).toBe(350)
        expect(currentData.CO2.unit).toBe("ppm")
    })
})

describe("The addNewData() function with correct input data", () => {
    test("test", async () => {
        dataDb.addNewReading = jest.fn((newReading) => {
            readings.push(newReading)
            return {
                ...newReading,
                id: 3
            }
        })
        const readingToAdd = {
            VOC: {
                value: 200,
                unit: "ppb"
            },
            CO2: {
                value: 400,
                unit: "ppm"
            }
        }
        const newReadingFromDatabase = await dataController.addNewData(readingToAdd)
        expect(newReadingFromDatabase.VOC.value).toBe(200)
        expect(newReadingFromDatabase.VOC.unit).toBe("ppb")
        expect(newReadingFromDatabase.CO2.value).toBe(400)
        expect(newReadingFromDatabase.CO2.unit).toBe("ppm")
        expect(newReadingFromDatabase.id).toBe(3)
        expect(readings.length).toBe(3)
    })
})

describe("The addNewData() function with incorrect input data", () => {
    test("test", async () => {
        dataDb.addNewReading = jest.fn((newReading) => {
            readings.push(newReading)
            return {
                ...newReading,
                id: 3
            }
        })
        const readingToAdd = {
            VOC: {
                value: 200,
                unit: "ppb"
            },
        }
        const newReadingFromDatabase = await dataController.addNewData(readingToAdd)
        expect(newReadingFromDatabase).toBe(null)
        expect(readings.length).toBe(3)
    })
})


const readings = [
    {
        id: 1,
        VOC: {
            value: 100,
            unit: "ppb"
        },
        CO2: {
            value: 250,
            unit: "ppm"
        }
    },
    {
        id: 2,
        VOC: {
            value: 150,
            unit: "ppb"
        },
        CO2: {
            value: 350,
            unit: "ppm"
        }
    }
]