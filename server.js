import express from "express";
import cors from "cors";
import dataRoutes from "./routes/dataRoutes.js"

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use('/data', dataRoutes);

app.get("/", (req, res) => {
    res.send('Server is running')
})

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
