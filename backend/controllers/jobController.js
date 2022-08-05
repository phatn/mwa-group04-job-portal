const Job = require('../models/JobModel');

module.exports.getAllJobs = async function (req, res, next) {
    console.log("getAllJobs");
    try {
        const results = await Job.find();
        res.json(results);
    } catch (error) {
        next(error);
    }
}

module.exports.getJobById = async function (req, res, next) {
    console.log("getjobById");
    try {
        const { job_id } = req.params;
        const results = await Job.findById(job_id);
        res.json(results);
    } catch (error) {
        next(error);
    }
}

module.exports.updateJobById = async function (req, res, next) {
    console.log("updateJobById");
    try {
        const { job_id } = req.params;
        const job = req.body;
        const results = await Job.updateOne(
            { _id: job_id },
            { $set: job });
        res.json(results);
    } catch (error) {
        next(error);
    }
}

module.exports.updateJobStatusById = async function (req, res, next) {
    console.log("deleteJobById");
    try {
        const { job_id } = req.params;
        const results = await Job.deleteOne(
            { _id: job_id });
        if (results.deletedCount > 0) {
            res.status(200).json(results);
        }
        next({ error: 'update unsuccessful' });
    } catch (error) {
        next(error);
    }
}

module.exports.createJob = async function (req, res, next) {
    console.log("createJob");
    try {
        const job = req.body;
        const results = await Job.create(job);
        res.json(results);
    } catch (error) {
        next(error);
    }
}