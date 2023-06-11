const { userMessages } = require('../../controllers/AdminMessagescontroller')

const router = require('express').Router()


router.post('/', userMessages);



module.exports = router;


