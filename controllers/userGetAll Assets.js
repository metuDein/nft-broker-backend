const Assets = require('../model/Assets');

const getAllAssets = async (req, res) => {
    const { contractAddress } = req?.body;

    if (!contractAddress) return res.status(400).json({message : 'no contract address given'});

    const user = await NftUsers.findOne({contractAddress : contractAddress });

    if(!user) return res.status(400).json({message : 'user not found'});

    const assets = await Assets.find({token_address : user.contractAddress});

    if(!assets) return res.status(204).json({message : 'you no assets'});

    res.status(200).json(assets);

}

