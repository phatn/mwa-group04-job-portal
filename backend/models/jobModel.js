const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: String,
    description: String,
    skills: [],
    job_type: String,
    location: {
        address: String,
        city: String,
        state: String,
        country: String
    },
    timestamp_created: Number,
    created_by: String,
    employer: {
        _id: String,
        email: String,
        fullname: String,
        organization: String
    },
    applied_by: [
        {
            _id: String,
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
    ]
});

module.exports = mongoose.model('Job', schema);