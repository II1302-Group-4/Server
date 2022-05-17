import mongoose from "mongoose"
import Reading from "../../models/reading.js"
import * as dataDb from "../../dataDb.js"

/**
 * 
 */
describe("Testing the database module", () => {
    let firstReading
    let secondReading
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    })
    beforeEach(async () => {
        firstReading = { VOC: 1, CO2: 1, time: 0 }
        secondReading = { VOC: 2, CO2: 2, time: 3600 }
        const firstNewReading = new Reading(firstReading)
        const secondNewReading = new Reading(secondReading)
        await firstNewReading.save()
        await secondNewReading.save()
    })
    afterEach(async () => {
        try {
            await Reading.deleteMany();
        } catch (err) {
            console.log(err)
        }
    })
    afterAll(async () => {
        await mongoose.connection.close()
    })
    describe("The getLatestReading() function", () => {
        test("it should get the latest reading", async () => {
            const latest = await dataDb.getLatestReading()
            expect(latest.length).toBe(1)
            expect(latest[0]).toMatchObject(secondReading)
        })
    })
    describe("The addNewReading() function", () => {
        test("it should add a document if there is input data", async () => {
            const reading = { VOC: 3, CO2: 3, time: 2 }
            await dataDb.addNewReading(reading)
            const allReadings = await Reading.find()
            const newestReading = await dataDb.getLatestReading()
            expect(allReadings.length).toBe(3)
            expect(newestReading[0]).toMatchObject(reading)
        })
        test("it should not add a document if there is not input data", async () => {
            const reading = null
            await dataDb.addNewReading(reading)
            const allReadings = await Reading.find()
            const newestReading = await dataDb.getLatestReading()
            expect(allReadings.length).toBe(2)
            expect(newestReading[0]).toMatchObject(secondReading)
        })
    })
    describe("The getAllWithinTimespan() function", () => {
        test("it should return all readings when they all fall within the given timespan", async () => {
            const startTimeStamp = 0
            const endTimeStamp = 3600
            const readings = await dataDb.getAllWithinTimespan(startTimeStamp, endTimeStamp)
            expect(readings.length).toBe(2)
        })
        test("it should exclude readings that do not fall within the given timespan", async () => {
            const startTimeStamp = 0
            const endTimeStamp = 3599
            const readings = await dataDb.getAllWithinTimespan(startTimeStamp, endTimeStamp)
            expect(readings.length).toBe(1)
        })
    })
})