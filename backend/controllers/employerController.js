const Employer = require('../models/EmployerModel');
const bcrypt = require('bcrypt');


module.exports.getEmployerById = async function (req, res, next) {
    console.log("getEmployerById");
    try {
        const { employer_id } = req.params;
        console.log(employer_id);
        const results = await Employer.findById(employer_id);
        res.json(results);
    } catch (error) {
        next(error);
    }
}

module.exports.updateEmployerById = async function (req, res, next) {
    console.log("updateEmployerById");
    try {
        const { employer_id } = req.params;
        const employer = req.body;
        const results = await Employer.updateOne(
            { _id: employer_id },
            { $set: employer });
        res.json(results);
    } catch (error) {
        next(error);
    }
}

module.exports.createEmployer = async function (req, res, next) {
    console.log("createEmployer");
    try {
        const employer = req.body;
        const results = await Employer.create(employer);
        res.json(results);
    } catch (error) {
        next(error);
    }
}

module.exports.createEmployers = async function (req, res, next) {
    console.log("createEmployers");
    try {
        const employers = req.body;
        employers.forEach(employer => {
            console.log(employer);
            Employer.create(employer);
        });
        res.json({ success: 1 });
    } catch (error) {
        next(error);
    }
}