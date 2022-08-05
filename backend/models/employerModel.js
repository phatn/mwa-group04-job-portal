const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: String,
    password: String,
    fullname: String,
    organization: String,
    location: {
        address: String,
        city: String,
        state: String,
        country: String
    },

});

module.exports = mongoose.model('Employer', schema);