const Assets = require('../model/Assets');


const getAllAssets = async (req, res) => {

    const assets = await Assets.find();

    if(!assets) return res.status(204).json({message : 'you no assets'});

    res.status(200).json(assets);

}

const createanAsset = async(req, res) => {
    const { name, image, contractAddress, supply, price, blockChain, description } = req.body;

    if (!contractAddress || !name || !image || !supply || !price || !blockChain) return res.status(400).json({ message: ` all fields required` });
    if (!duplicate) {
        try {
            const result = await Assets.create({token_address : contractAddress, name : name, block_number_minted : supply, image : image, price : price, description: description  });

            if (!result) return res.status(400).json({ message: `error creating asset` })
           
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

    const asset = await Assets.findOne({_id : id});
    if(!asset) return res.status(204).json({message : "no content found"});

    if (req.body?.image) asset.image = req.body.image;
    if (req.body?.description) asset.description = req.body.description;
    if (req.body?.price) asset.price = req.body.price;
    if (req.body?.supply) asset.block_number_minted = req.body.supply;
    if (req.body?.category) asset.categories = req.body.category;
    if (req.body?.trending) asset.trending = req.body.trending;
    if (req.body?.token_address) asset.token_address = req.body.token_address;

    const result = await asset.save();

    if(!result) return res.status(403).json({message : 'update failed please retry'});
    res.status(200).json({message : 'updated successfully'}); 
};


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
    createanAsset,
    editAsset,
    deleteAssets,
    getAnAsset
}