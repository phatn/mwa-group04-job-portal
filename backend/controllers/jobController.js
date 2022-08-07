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

module.exports.createJobs = async function (req, res, next) {
    console.log("createJobs");
    try {
        const jobs = req.body;
        const results = await Job.insertMany(jobs);
        res.json({ success: 1 });
    } catch (error) {
        next(error);
    }
}

module.exports.search = async function (req, res, next) {
    try {
        const { keyword, city, state } = req.query;
        let results;
        if(city && state) {
            console.log('enter 1')
            results = await Job.find({
                $or: [{"location.city": city}, {"location.state": state}],
                $text: {$search: keyword}
            });
        } else if(city) {
            console.log('enter 2')
            results = await Job.find({"location.city": city , $text: {$search: keyword}});
        } else if(state) {
            console.log('enter 3')
            results = await Job.find({"location.state": state , $text: {$search: keyword}});
        } else {
            console.log('enter 4')
            results = await Job.find({$text: {$search: keyword}});
        }
        res.json(results);
    } catch (error) {
        next(error);
    }
}