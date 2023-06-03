const express  = require('express')
const { getAssets, createAssets } = require('../../controllers/assetsController ')
const router = express.Router()



router.route('/')
.get(getAssets)
.post(createAssets)

module.exports = router

