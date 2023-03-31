const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authController');

router.get('/login', AuthController.getLoginForm);
router.post('/login', AuthController.login);

router.get('/signup', AuthController.getSignupForm);
router.post('/signup', AuthController.signup);

router.get('/logout', AuthController.logout);

module.exports = router;