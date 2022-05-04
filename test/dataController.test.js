import * as dataController from "../controllers/dataController.js";
import * as dataDb from "../db/dataDb.js"


describe("The getCurrentData() function", () => {
    test("test", async () => {
        dataDb.getLatestReading = jest.fn(() => [readings[readings.length - 1]])

        const currentData = await dataController.getCurrentData();
        expect(currentData.date).toBe("2022-05-04")
        expect(currentData.VOC.value).toBe(150)
        expect(currentData.VOC.unit).toBe("ppb")
        expect(currentData.CO2.value).toBe(350)
        expect(currentData.CO2.unit).toBe("ppm")
    })
})

// describe("The addNewData() function", () => {
//     test("test", () => {
//         addNewReading = jest.fn((newReading) => readings.append(newReading))

//         const newReading = await dataController
//         expect()
//     })
// })


const readings = [
    {
        id: 1,
        date: "2022-05-03",
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
        date: "2022-05-04",
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