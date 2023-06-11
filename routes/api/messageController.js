const express = require('express');
const { getAllRequestMessage, deleteMessage, getMessage, sendMessage } = require('../../controllers/messageController');
const router = express.Router()


router.route('/')
.get(getAllRequestMessage)
.post(sendMessage)
.delete(deleteMessage);

router.route('/:id')
.get(getMessage);

module.exports = router;