import "dotenv/config"
import express from "express";
import cors from "cors";
import currentDataRoutes from "./routes/currentDataRoutes.js"
import historicDataRoutes from "./routes/historicDataRoutes.js"
import mongoose from "mongoose";

/**
 * Sets the port to 5000 if the environment variable is not set.
 * During deployment it is set so the port varies.
 */
const PORT = process.env.PORT || 5000;

/**
 * Gets the database connection string from the environment variable.
 * During development it is set in .env.
 * During deployment it is stored in the service on Azure.
 */
const dbUrl = process.env.CUSTOMCONNSTR_dbUrl;

/**
 * 
 */
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

/**
 * Sets the behaviour of the different routes of the server.
 */
app.use('/data', currentDataRoutes);
app.use('/history', historicDataRoutes);
app.get("/", (req, res) => {
    res.send('Server is running')
})

/**
 * Connects to the database and runs the server.
 */
mongoose.connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => app.listen(PORT, () => { }))
    .catch(err => console.log(err))

export default app;