const Seeker = require('../models/seekerModel');
const Employer = require('../models/employerModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Utils = require('../utils/utils');


module.exports.login = async function (req, res, next) {
    console.log("login");
    const { email, password } = req.body;
    let userdb, token;

    //validate if Seeker
    userdb = await Seeker.findOne({ email });
    if (userdb) {
        bcrypt.compare(password, userdb.password, (err, isMatch) => {
            if (err) {
                next({ error: err });
            } else if (!isMatch) {
                console.log(`Password not matched!!!`);
                next({ error: "Login failed!" });
            } else {
                console.log("Seeker Password matches!");
                token = Utils.generateJWTToken({ user_id: userdb._id, fullname: userdb.fullname, email: userdb.email, role: "seeker" },
                    Utils.getSecretOrPrivateKey());
                console.log(`Seeker token: ${token}`)
                return res.status(200).json({ token: token });
            }
        });
    } else {
        //validate if Employer
        userdb = await Employer.findOne({ email });
        if (userdb) {
            bcrypt.compare(password, userdb.password, (err, isMatch) => {
                if (err) {
                    next({ error: err });
                } else if (!isMatch) {
                    console.log(`Password not matched!!!`);
                    next({ error: "Login failed!" });
                } else {
                    console.log("Employer Password matches!");
                    token = Utils.generateJWTToken({ user_id: userdb._id, fullname: userdb.fullname, email: userdb.email, role: "employer" },
                        Utils.getSecretOrPrivateKey());
                    console.log("token", token);
                    return res.status(200).json({ token: token });
                }
            });
        } else {
            console.log(`Email not matched!!!`);
            next({ error: "Login failed!" });
        }
    }
}

