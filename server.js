import express from "express";
import cors from "cors";
import dataRoutes from "./routes/dataRoutes.js"
import mongoose from "mongoose";
// import dbConfig from "./config/dbConfig.js";

//Port is set depending on production or development environment
const PORT = process.env.PORT || 5000;
const dbUrl = process.env.dbUrl;


const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use('/data', dataRoutes);

app.get("/", (req, res) => {
    res.send('Server is running')
})

mongoose.connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch(err => console.log(err))

