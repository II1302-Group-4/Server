import mongoose from "mongoose";

const readingSchema = mongoose.Schema({
    date: {
        type: Date,
        default: new Date()
    },
    VOC: {
        value: Number,
        unit: String
    },
    CO2: {
        value: Number,
        unit: String
    }
})

const Reading = mongoose.model("Reading", readingSchema)

export default Reading;