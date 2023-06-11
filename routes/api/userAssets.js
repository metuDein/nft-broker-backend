const express = require('express');
const { createAssets, editAsset, getAllAssets, deleteAssets, getAnAsset } = require('../../controllers/userAssetsController');
const router = express.Router();


router.route('/')
.get(getAllAssets)
.post(createAssets)
.patch(editAsset)
.delete(deleteAssets)


router.route('/:id')
.get(getAnAsset)


module.exports = router;