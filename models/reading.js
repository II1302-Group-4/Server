import mongoose from "mongoose";

/**
 * 
 */
const readingSchema = mongoose.Schema({
    time: {
        type: Number
    },
    VOC: {
        type: Number
    },
    CO2: {
        type: Number
    }
})

const Reading = mongoose.model("Reading", readingSchema)

export default Reading; 