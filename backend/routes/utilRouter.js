const express = require('express');
const utilController = require('../controllers/utilController');
const {checkToken} = require('../middlewares/auth');
const router = express.Router();


//for testing purpuse
router.post('/location', checkToken, utilController.createLocationDb);

router.get('/location', checkToken, utilController.getCountries);

router.get('/location/:country_id', checkToken, utilController.getStates);

router.get('/location/:country_id/:state_id', checkToken, utilController.getCities);

module.exports = router;