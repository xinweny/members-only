const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/login', authController.getLoginForm);
router.post('/login', authController.login);

router.get('/signup', authController.getSignupForm);
router.post('/signup', authController.signup);

router.get('/logout', authController.logout);

module.exports = router;