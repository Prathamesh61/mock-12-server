const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { JobModel } = require("../models/jobs.model");

const JobRouter = Router();

JobRouter.get("/", async (req, res) => {
    const jobs = await JobModel.find();
    res.send({ "jobs": jobs });
});

JobRouter.post("/create", async (req, res) => {
    const { company, city, location, role, level, contract, position, language } = req.body;
    const newJob = new JobModel({
        company, city, location, role, level, contract, position, language
    });
    try {
        await newJob.save();
        res.send({ "msg": "Job Created", "newJob": newJob });
    } catch (err) {
        res.send({ "msg": "something went wrong" });
        console.log(err);
    }
});


JobRouter.delete("/delete/:id", async (req, res) => {
    const jobs = await JobModel.find();
    const job = JobModel.id(id);
    job.remove();
    await job.save();
    res.send({ "msg": `Job Deleted Successfully`, jobs: jobs });
})

module.exports = {
    JobRouter,
};
