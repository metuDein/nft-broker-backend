const { getAllRequestMessage, deleteMessage, getAMessage } = require('../../controllers/UserMessages');

const router = require('express').Router();


router.route('/')
.post(getAllRequestMessage)

router.route('/:id')
.get(getAMessage)
.delete(deleteMessage)


module.exports = router