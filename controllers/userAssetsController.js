const Assets = require('../model/Assets');
const NftUsers = require('../model/NftUsers');



const getAllAssets = async (req, res) => {
    const { contractAddress } = req.body

    const user = await NftUsers.findOne({contractAddress : contractAddress });
    if(!user) return res.status(400).json({message : 'user not found'});

    const assets = await Assets.find({token_address : user.contractAddress});

    if(!assets) return res.status(204).json({message : 'you no assets'});

    res.status(200).json(assets);

}


const createAssets = async (req, res) => {
    const { name, image, contractAddress, supply, price, blockChain } = req.body;

    if (!contractAddress || !name || !image || !supply || !price || !blockChain) return res.status(403).json({ message: 'all fields are required' })

    const duplicate = await Assets.findOne({ name: name, image: image });

    if (!duplicate) {
        try {
            const newAsset = {
                token_address : contractAddress,
                name,
                block_number_minted : supply,
                image,
            }

            const result = await Assets.create({token_address : contractAddress, name : name, block_number_minted : supply, image : image });

            if (result) 
            {
                const owner = await NftUsers.findOne({contractAddress : contractAddress}).exec()
                
                if(!owner) return res.status(400).json({ message: `owner not found` })
                owner.assets.allAssets.itemData.itemId = result._id;
                owner.assets.allAssets.itemData.itemName = name;
                owner.assets.allAssets.itemData.itemPrice = price;
                owner.assets.allAssets.itemData.netWork = blockChain;
                owner.assets.allAssets.itemData.Quantity = supply;


                owner.assets.createdAssets.itemData.itemId  = result._id;
                owner.assets.createdAssets.itemData.itemName = blockChain;
                owner.assets.createdAssets.itemData.itemPrice = price;
                owner.assets.createdAssets.itemData.netWork = name;
                owner.assets.createdAssets.itemData.Quantity = supply;


                const  result0 = await owner.save();

                if(!result) return res.status(400).json({ message: `save failed` })
                res.status(201).json({ message: `asset ${name} successfully created`, result });

            }else{
                return res.status(400).json({ message: `error creating asset` })

            };
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

    const asset = await Assets.findOne({_id : id});
    if(!asset) return res.status(204).json({message : "no content found"});

    if (req.body?.image) asset.image = req.body.image;
    if (req.body?.description) asset.description = req.body.description;
    if (req.body?.price) asset.price = req.body.price;
    if (req.body?.supply) asset.block_number_minted = req.body.supply;

    const result = await asset.save();

    if(!result) return res.status(403).json({message : 'update failed please retry'});
    res.status(200).json({message : 'updated successfully'});
}

const deleteAssets = async (req, res) => {
    const { id } = req.body;

    if(!id) return res.status(400).json({ message: ` item id required` });

    const asset = await Assets.findOne({_id : id});
    if(!asset) return res.status(204).json({message : "no content found"});

    const result = await asset.deleteOne()

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

