const { getAllAssets } = require('../controllers/getAllCollectionandAssets')
const router =  require('express').Router()


router.get('/', getAllAssets);



module.exports = router