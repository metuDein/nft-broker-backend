const Assets = require('../model/Assets');
const NftUsers = require('../model/NftUsers');





const getAllAssets = async (req, res) => {
    const { contractAddress } = req?.body;

    if (!contractAddress) return res.status(400).json({message : 'no contract address given'});

    const user = await NftUsers.findOne({contractAddress : contractAddress }).exec();

    if(!user) return res.status(400).json({message : 'user not found'});

    const assets = await Assets.find({token_address : user.contractAddress});

    if(assets.length === 0) return res.status(204).json({message : 'you no assets'});

    res.status(200).json(assets);

}


const createAssets = async (req, res) => {
    const { name, image, contractAddress, supply, price, blockChain } = req.body;

    if (!contractAddress || !name || !image || !supply || !price || !blockChain) return res.status(403).json({ message: 'all fields are required' })

    const duplicate = await Assets.findOne({ name: name, image: image }).exec();

    if (!duplicate) {
        try {

            const result = await Assets.create({token_address : contractAddress, name : name, block_number_minted : supply, image : image, price : price });

            if (!result) return res.status(400).json({ message: `error creating asset` })

            if(req.body.description) result.description = req.body.description 
            if(req.body.category) result.categories = req.body.category 

            const result2 = await result.save()

            if(!result2) return res.status(400).json({ message: `error creating asset` })
           
                res.status(201).json({ message: `asset ${name} successfully created`, result });
        } catch (error) {
            console.log(error.message)
            res.status(500).json(error.name)
        }

    } else {
        
        res.status(409).json({ duplicate });

    }

}


const editAsset = async (req, res) => {
    const { id } = req.body;

    if(!id) return res.status(400).json({ message: ` item id required` });

    const asset = await Assets.findOne({_id : id}).exec();
    if(!asset) return res.status(204).json({message : "no content found"});

    if (req.body?.image) asset.image = req.body.image;
    if (req.body?.description) asset.description = req.body.description;
    if (req.body?.price) asset.price = req.body.price;
    if (req.body?.supply) asset.block_number_minted = req.body.supply;
    if (req.body?.category) asset.categories = req.body.category;

    const result = await asset.save();

    if(!result) return res.status(403).json({message : 'update failed please retry'});
    res.status(200).json({message : 'updated successfully'});
}

const deleteAssets = async (req, res) => {
    const { id } = req.body;

    if(!id) return res.status(400).json({ message: ` item id required` });

    const asset = await Assets.findOne({_id : id}).exec();
    if(!asset) return res.status(204).json({message : "no content found"});

    const result = await asset.deleteOne({_id : id});

    if(!result) return res.status(400).json({ message: `delete failed` });
    res.status(200).json({message : 'deleted successfully'});
}



const getAnAsset = async (req, res) => {
    const { id } = req.params
    if(!id) return res.status(400).json({ message: ` item id required` });

    const asset = await Assets.findOne({_id : id });
    if(!asset) return res.status(204).json({message : 'no content'});


    res.status(200).json(asset);

}


module.exports = {
    getAllAssets,
    createAssets,
    editAsset,
    deleteAssets,
    getAnAsset
}

