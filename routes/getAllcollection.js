const { getAllCollections } = require('../controllers/getAllCollectionandAssets')
const router =  require('express').Router()


router.get('/', getAllCollections);



module.exports = router