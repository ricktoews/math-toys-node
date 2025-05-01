const express = require('express');
const router = express.Router();
const mathController = require('../controllers/mathController');

// Define API endpoints
router.get('/dc/:denominator', mathController.handleDc);
router.get('/recip/:denominator', mathController.handleRecip);
router.get('/pythag/:corner', mathController.pythagorean);
router.get('/phi/:powers', mathController.phiPowers);

module.exports = router;
