import mongoose from "mongoose";

const readingSchema = mongoose.Schema({
    date: {
        type: Date,
        default: new Date()
    },
    chemical: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },

    //sensorid?
    //flera chems i samma?
})

const Reading = mongoose.model("Reading", readingSchema)

export default Reading;