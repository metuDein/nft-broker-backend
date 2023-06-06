const { getAllAssets, createanAsset, editAsset, deleteAssets, getAnAsset } = require('../../controllers/AdminAssetsController');

const router = require('express').Router();

router.route('/')
.get(getAllAssets)
.post(createanAsset)
.put(editAsset)
.delete(deleteAssets)

router.route('/:id')
.get(getAnAsset)


module.exports = router;