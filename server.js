import express from "express";
import cors from "cors";
import dataRoutes from "./routes/dataRoutes.js"
import mongoose from "mongoose";
import dbConfig from "./config/dbConfig.js";

//Port is set depending on production or development environment
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use('/data', dataRoutes);

app.get("/", (req, res) => {
    res.send('Server is running')
})

mongoose.connect("mongodb://pollusense-project-db:BF1HVnjc2chdB6B56VbyDfSpEdYhUNlnmcYhrI1zLsnXhIFfFNlb5BR3B7uszVp2Sviu3ptEiPwwihUsWRunfQ%3D%3D@pollusense-project-db.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@pollusense-project-db@", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch(err => console.log(err))

