const Assets = require('../model/Assets');



const getAllAssets = async (req, res) => {
    const assets = await Assets.find({})
    if(!assets) return res.status(204).json({message : 'no content found'});

    res.status(200).json(assets);
    
}


const getAllCollections = async (req, res) => {
    const nfts = await NftCollection.find();
    if (!nfts) return res.status(204).json({message : 'no collection found'});
    res.status(200).json(nfts);
}

module.exports = {
    getAllAssets,
    getAllCollections
}