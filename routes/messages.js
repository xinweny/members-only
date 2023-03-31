const express = require('express');
const router = express.Router();

const MessageController = require('../controllers/messageController');

router.get('/', MessageController.list);

router.get('/messages/create', MessageController.getForm);
router.post('/messages/create', MessageController.createMessage)

module.exports = router;