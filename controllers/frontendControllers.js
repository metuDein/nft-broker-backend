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

const getTrendingAssets = async (req, res) => {
    const trending = await Assets.findOne({trending : true}).exec();

    if (!trending) return res.status(204).json({message : 'no trending content'});

    res.status(200).json({trending});

}

const getAnAsset =  async (req, res) => {
    const {id} = req.params;
    if(!id) return res.status(204).json({message  :'no item found'})

    const asset = await Assets.findOne({_id : id}).exec();

    if(!asset) return res.status(204).json({message : 'no assets'})

    res.status(200).json(asset);

} 

module.exports = {
    getCollection,
    getCollectionAssets,
    getTrendingAssets,
    getAnAsset
}