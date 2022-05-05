import mongoose from "mongoose";

const readingSchema = mongoose.Schema({
    date: {
        type: Number,
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

//lägg till required


const Reading = mongoose.model("Reading", readingSchema)

export default Reading;