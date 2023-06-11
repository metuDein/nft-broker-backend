const router = require('express').Router()
const {getAllRequestMessage} = require('../../controllers/AdminMessagescontroller')


router.post('/', getAllRequestMessage);


module.exports = router;