const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/', authController.getSignupForm);
router.post('/', authController.signup);

module.exports = router;