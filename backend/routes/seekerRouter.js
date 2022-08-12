const express = require('express');
const router = express.Router();
const seekerController = require('../controllers/seekerController');
const {checkToken} = require('../middlewares/auth');

/**************** SEEKER ************************** */
//update seeker
//router.get('/seekers/:seeker_id', auth.authSeeker, seekerController.getSeekerById);
router.get('/:seeker_id', checkToken, seekerController.getSeekerById);

//create new seeker
router.post('/', checkToken, checkToken, seekerController.createSeeker);

//update seeker
//router.patch('/seekers/:seeker_id', auth.authSeeker, seekerController.updateSeekerById);
router.patch('/:seeker_id/', checkToken, seekerController.updateSeekerById);


router.patch('/job/:job_id', checkToken, seekerController.applyJob);

router.get('/my-job/:email', checkToken, seekerController.getMyJobs);

module.exports = router;