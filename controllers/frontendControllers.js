const NftCollection = require('../model/NftCollection');
const Assets = require('../model/Assets')


const getCollection = async (req, res) => {
    const {contractAddress} = req.body;
    if(!contractAddress) return res.status(400).json({message : 'please retrun contact address'});

    const collection = await NftCollection.findOne({contractAddress : contractAddress});
    if(!collection) return res.status(204).json();


    res.status(200).json({collection});
}

const getCollectionAssets = async (req, res) => {
    const {contractAddress} = req.body;
    if(!contractAddress) return res.status(400).json({message : 'please retrun contact address'});

    const assets = await Assets.find({token_address : contractAddress})
    if(!assets) return res.status(204).json();

    res.status(200).json({assets});

}

module.exports = {
    getCollection,
    getCollectionAssets
}