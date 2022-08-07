const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const employerController = require('../controllers/employerController');
const seekerController = require('../controllers/seekerController');
const auth = require('../middlewares/auth');

//login
router.post('/login', loginController.login);

/**************** TEST DATA ************************** */

router.post('/employers/test', employerController.createEmployers);

router.post('/seekers/test', seekerController.createSeekers);


/**************** SEEKER ************************** */
//update seeker
//router.get('/seekers/:seeker_id', auth.authSeeker, seekerController.getSeekerById);
router.get('/seekers/:seeker_id', seekerController.getSeekerById);

//create new seeker
router.post('/seekers', seekerController.createSeeker);

//update seeker
//router.patch('/seekers/:seeker_id', auth.authSeeker, seekerController.updateSeekerById);
router.patch('/seekers/:seeker_id', seekerController.updateSeekerById);

module.exports = router;