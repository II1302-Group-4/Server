import "dotenv/config"
import express from "express";
import cors from "cors";
import currentDataRoutes from "./routes/currentDataRoutes.js"
import historicDataRoutes from "./routes/historicDataRoutes.js"
import mongoose from "mongoose";

/**
 * 
 */
const PORT = process.env.PORT || 5000;
const dbUrl = process.env.CUSTOMCONNSTR_dbUrl;

/**
 * 
 */
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

/**
 * 
 */
app.use('/data', currentDataRoutes);
app.use('/history', historicDataRoutes);
app.get("/", (req, res) => {
    res.send('Server is running')
})

/**
 * 
 */
mongoose.connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => app.listen(PORT, () => { }))
    .catch(err => console.log(err))

export default app;