const { addToCart } = require('../../controllers/cartController');

const router = require('express').Router();

router.route('/')
.post(addToCart)



module.exports = router;