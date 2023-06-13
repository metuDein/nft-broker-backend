const express = require('express')
const router = express.Router()
const {getAllRequestMessage} = require('../../controllers/AdminMessagescontroller')


router.post('/', getAllRequestMessage);


module.exports = router;