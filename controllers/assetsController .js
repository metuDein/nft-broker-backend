const Assets = require('../model/Assets');

const getAssets = async (req, res) => {
    const { limit } = req.body
    const assets = await Assets.find();


    if (!assets) return res.status(204).json();

    res.json({ assets })
}

const getUserAssets = async (req, res) => {
    const { contractAddress } = req.body;

    if(!contractAddress) return res.status(400).json({message : 'user address required'});
    

    const assets = await Assets.find({token_address : contractAddress});

    if(!assets) return res.status(204).json({message : 'no assets available'});
    
    res.status(200).json(assets)

}






const createAssets = async (req, res) => {
    const { token_address, token_id, name, image, block_number_minted } = req.body;



    if (!token_address || !token_id || !name || !image || !block_number_minted) return res.status(403).json({ message: 'all fields are required' })

    const duplicate = await Assets.findOne({ name: name, image: image });

    if (!duplicate) {
        try {
            const newAsset = {
                token_address,
                token_id,
                name,
                block_number_minted,
                image,
            }

            const result = await Assets.create(newAsset);
            if (!result) return res.status(400).json({ message: `error creating asset` });
            res.status(201).json({ message: `asset ${name} successfully created`, result });
        } catch (error) {
            console.log(error.message)
            res.status(500).json(error.name)
        }

    } else {
        res.status(409).json({ duplicate });

    }

}

const createAllAssets = async (req, res) => {
    const { assets } = req.body
    if (!assets) return res.status(204).json({ message: 'no content' });


    let result;
    for (let i = 0; i < assets.length; i++) {

        let metadata = assets[i].metadata
        metadata = JSON.parse(metadata)
        const duplicate = await Assets.findOne({ name: assets[i].name, token_id: assets[i].token_id, image: metadata.image });
        if (duplicate) {
            continue;
        } else {
            result = await Assets.create({ token_address: assets[i].token_address, token_id: assets[i].token_id, block_number_minted: assets[i].block_number_minted, image: metadata.image, name: assets[i].name, })
        }


    }
    if (!result) return res.status(400).json({ message: 'failed request' });
    res.status(201).json({ message: 'upload completed' });


    
}


module.exports = {
    getAssets,
    createAssets,
    createAllAssets,
    getUserAssets
}