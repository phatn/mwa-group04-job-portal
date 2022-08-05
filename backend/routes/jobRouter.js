const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

//get all jobs
router.get('/', jobController.getAlljobs);

//get a job
router.get('/:job_id', jobController.getJobById);

//update a job
router.patch('/:job_id', jobController.updateJobById);

//delete a job
router.delete('/:job_id', jobController.updateJobStatusById);

//add new job
router.post('/', jobController.createJob);

module.exports = router;