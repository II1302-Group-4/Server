import mongoose from "mongoose";

/**
 * The schema mapping to the collection "readings" in the database. 
 * Defines the shape of the documents saved in this collection.
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

/**
 * Creates the model from the above specified schema. It is through this object communication with the
 * "readings" collection is handled.
 */
const Reading = mongoose.model("Reading", readingSchema)

export default Reading; 