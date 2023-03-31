const express = require('express');
const router = express.Router();

const messageController = require('../controllers/messageController');

router.get('/', messageController.list);

router.get('/messages/create', messageController.getForm);
router.post('/messages/create', messageController.createMessage)

module.exports = router;