const { userVerifcation } = require('../../controllers/AdminMessagescontroller')

const router = require('express').Router()


router.post('/', userVerifcation);



module.exports = router;