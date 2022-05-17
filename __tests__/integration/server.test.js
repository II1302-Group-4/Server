import supertest from "supertest"
import app from "../../server.js"
import * as controller from "../../controller.js"

jest.mock("../../controller.js")

controller.getCurrentData.mockImplementation(() => { })
controller.addNewData.mockImplementation(() => { })
controller.getHistoricData.mockImplementation(() => { })

/**
 * 
 */
describe("HTTP endpoints", () => {
    describe("GET /data", () => {
        test("is allowed access with the correct origin header", async () => {
            let response = await supertest(app).get("/data").set("origin", "https://pollusense.azurewebsites.net")
            expect(response.statusCode).toBe(200)
        })
        test("is denied access with the incorrect origin header", async () => {
            let response = await supertest(app).get("/data")
            expect(response.statusCode).toBe(403)
        })
        test("shows the correct status code if an error occurs", async () => {
            controller.getCurrentData.mockImplementation(() => { throw Error })
            let response = await supertest(app).get("/data").set("origin", "https://pollusense.azurewebsites.net")
            expect(response.statusCode).toBe(404)
        })
    })
    describe("POST /data", () => {
        test("is allowed to post with the correct body parameters", async () => {
            let response = await supertest(app).post("/data").send({ VOC: 1, CO2: 1, time: 1 })
            expect(response.statusCode).toBe(201)
        })
        test("is not allowed to post with the incorrect body parameters", async () => {
            let response = await supertest(app).post("/data").send({ VOC: 1, CO2: 1 })
            expect(response.statusCode).toBe(409)
        })
        test("shows the correct status code if an error occurs", async () => {
            controller.addNewData.mockImplementation(() => { throw Error })
            let response = await supertest(app).post("/data").send({ VOC: 1, CO2: 1, time: 1 })
            expect(response.statusCode).toBe(409)
        })
    })
    describe("GET /history", () => {
        test("is allowed access with the correct origin header", async () => {
            let response = await supertest(app).get("/history").set("origin", "https://pollusense.azurewebsites.net")
            expect(response.statusCode).toBe(200)
        })
        test("is denied access with the incorrect origin header", async () => {
            let response = await supertest(app).get("/history")
            expect(response.statusCode).toBe(403)
        })
        test("shows the correct status code if an error occurs", async () => {
            controller.getHistoricData.mockImplementation(() => { throw Error })
            let response = await supertest(app).get("/history").set("origin", "https://pollusense.azurewebsites.net")
            expect(response.statusCode).toBe(404)
        })
    })
})
