const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: String,
    password: String,
    fullname: String,
    resume: String, ///public/src/files/abcd.pdf
    education: String, //master / bachelor
    skill_set: [    //[Java, NodeJS, Angular]
        {
            skill: String
        },
    ],
    yoe: Number,
    status: String //[active, inactive]
});

module.exports = mongoose.model('Seeker', schema);