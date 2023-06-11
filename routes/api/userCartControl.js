
const { getUserCart, deleteCartItem } = require('../../controllers/userCartController')

const router = require('express').Router()



router.route('/')
.post(getUserCart)
.delete(deleteCartItem);

module.exports = router;