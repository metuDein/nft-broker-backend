const NftCollection = require('../model/NftCollection');
const Assets = require('../model/Assets')





const getallAssets = async (req, res) => {
    const assets = await Assets.find();
    if(!assets) return res.status(204).json({message : 'no assets'})

    res.status(200).json(assets);
}


const getCollectionAssets = async (req, res) => {
    const {contractAddress} = req.body;
    if(!contractAddress) return res.status(400).json({message : 'please retrun contact address'});

    const assets = await Assets.find({token_address : contractAddress})
    if(!assets) return res.status(204).json();

    res.status(200).json({assets});

}




module.exports = {
    getallAssets,
   
}