const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const employerController = require('../controllers/employerController');
const auth = require('../middlewares/auth');

//login
router.post('/login', loginController.login);

/**************** TEST DATA ************************** */

router.post('/employers/test', employerController.createEmployers);

module.exports = router;