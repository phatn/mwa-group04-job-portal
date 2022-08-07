const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    title: String,
    description: String,
    skills: [
        { skill: String }
    ],
    job_type: String,
    location: {
        address: String,
        city: String,
        state: String,
        country: String
    },
    timestamp_created: { type: Number, default: Date.now() },
    created_by: String,
    employer: {
        _id: mongoose.Types.ObjectId,
        email: String,
        fullname: String,
        organization: String
    },
    applied_by: [
        {
            _id: mongoose.Types.ObjectId,
            email: String,
            fullname: String,
            resume: String,
            education: String,      //master / bachelor
            skill_set: [            //[Java, NodeJS, Angula]
                { skill: String }
            ],
            yoe: Number,
            status: String          //[submited, viewed, rejected, hired]
        },
    ],
    status: String                  //active/ inactive
});

module.exports =
    mongoose.models.Job || mongoose.model('Job', JobSchema);
