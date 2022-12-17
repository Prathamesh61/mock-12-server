const express = require('express');
const { connection } = require('./config/db');
const app = express();
app.use(express.json());
const cors = require("cors");
const { JobRouter } = require('./routes/jobs.route');
app.use(cors());

app.get("/", (req, res) => {
    res.send("Home page");
});

app.use("/job", JobRouter);

app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("Connection to DB successfully")
    }
    catch (err) {
        console.log("Error connecting to DB")
    }
    console.log("Listening on PORT", process.env.PORT)
})