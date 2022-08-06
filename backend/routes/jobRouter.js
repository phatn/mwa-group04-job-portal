const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middlewares/auth');

//test DB
router.post('/test', jobController.createJobs);

//get all jobs with queries
router.get('/', jobController.getAllJobs);

//get a job
router.get('/:job_id', jobController.getJobById);

//update a job
router.patch('/:job_id', auth.checkToken, auth.authEmployer, jobController.updateJobById);
//router.patch('/:job_id', jobController.updateJobById);

//add new job
//router.post('/', auth.checkToken, auth.authSeeker, jobController.createJob);
router.post('/', jobController.createJob);

module.exports = router;