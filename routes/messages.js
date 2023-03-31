const express = require('express');
const router = express.Router();

const MessageController = require('../controllers/messageController');

router.get('/', MessageController.list);

router.get('/messages/create', MessageController.getForm);
router.post('/messages/create', MessageController.createMessage);

router.post('/message/:id/delete', MessageController.deleteMessage);

module.exports = router;