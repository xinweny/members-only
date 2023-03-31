const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');

router.get('/membership', UserController.getMembershipForm);
router.post('/membership', UserController.grantMembership);

module.exports = router;
