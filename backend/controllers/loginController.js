const Seeker = require('../models/seekerModel');
const Employer = require('../models/employerModel');
const jwt = require('jsonwebtoken');

module.exports.login = async function (req, res, next) {
    const { email, password } = req.body;

    //validate if employer
    let userdb, token;

    userdb = await Seeker.findOne({ email });
    if (userdb) {
        if (userdb.password == password) {
            token = jwt.sign({ user_id: userdb._id, fullname: userdb.fullname, email: userdb.email, role: "seeker" }, 'SECRET');
            res.status(200).json({ token });
        }
    } else {
        userdb = await Employer.findOne({ email });
        if (userdb) {
            if (userdb.password == password) {
                token = jwt.sign({ user_id: userdb._id, fullname: userdb.fullname, email: userdb.email, role: "employer" }, 'SECRET');
                res.status(200).json({ token });
            }
        }
    }

    next({ error: "email / password not matched" });
}

