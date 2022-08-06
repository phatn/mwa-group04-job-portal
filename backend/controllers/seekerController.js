const Seeker = require('../models/SeekerModel');

module.exports.getSeekerById = async function (req, res, next) {
    console.log("getSeekerById");
    try {
        const { seeker_id } = req.params;
        const results = await Seeker.findById(seeker_id);
        res.json(results);
    } catch (error) {
        next(error);
    }
}

module.exports.updateSeekerById = async function (req, res, next) {
    console.log("updateSeekerById");
    try {
        const { seeker_id } = req.params;
        const seeker = req.body;
        const results = await Seeker.updateOne(
            { _id: seeker_id },
            { $set: seeker });
        res.json(results);
    } catch (error) {
        next(error);
    }
}

module.exports.createSeeker = async function (req, res, next) {
    console.log("createSeeker");
    try {
        const seeker = req.body;
        const results = await Seeker.create(seeker);
        res.json(results);
    } catch (error) {
        next(error);
    }
}

module.exports.createSeekers = async function (req, res, next) {
    console.log("createSeeker");
    try {
        const seekers = req.body;
        seekers.forEach(seeker => {
            Seeker.create(seeker);
        });
        res.json({ success: 1 });
    } catch (error) {
        next(error);
    }
}
