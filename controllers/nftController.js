const Assets = require('../model/Assets');
const NftCollection = require('../model/NftCollection');



const getNfts = async (req, res) => {
    const nft = await NftCollection.find();
    if (!nft) return res.status(204);
    res.json(nft);
}

const createNewAsset = async (req, res) => {
    const { name, categories, floorPrice, floorPriceUsd, network, blockChain, contractAddress, logo } = req.body

    if (!name || !floorPrice || !floorPriceUsd || !network || !blockChain || !contractAddress || !logo) return res.status(400).json({ message: 'check submitted data' });

    const duplicate = await NftCollection.findOne({ name: name, contractAddress: contractAddress, logo: logo }).exec();

    if (!duplicate) {
        const result = await NftCollection.create({ name, categories, floorPrice, floorPriceUsd, network, blockChain, contractAddress, logo })
        console.log(result);

        res.status(201).json({ message: `collection ${name} created` });
    } else {
        res.status(409).json({ message: `duplicate name, contractAddress or logo found` });
    }
}

const createAsset = async (req, res) => {

    const { image, contractAddress, supply, price, name, blockChain } = req.body;

    if(!image || !contractAddress || !supply || !price || !name || !blockChain) return res.status(400).json({message : 'all field required'})

    const duplicateImage = await Assets.findOne({ image: image, name: name }).exec();

    if (!duplicateImage) {
        res.status(409).json({ message: 'duplicate image found' })

        try {

            const result = await Assets.create({ image: image, token_address: contractAddress, block_number_minted: supply, price: price, name: name, blockChain: blockChain });

            if (!result) return res.status(401).json({ message: 'create asset failed' })

            res.status(200).json({ message: `assets ${name} created` });


        } catch (error) {
            console.log(error.name)
            console.log(error.message)
        }
    }
    return res.status(409).json({ message: 'duplicate image found' })
}


const updateNft = async (req, res) => {
    const { id } = req.body;
    if (!id) return res.status(400).json({ message: 'please provide an id' });

    const givenId = `_${id}`

    const nft = await NftCollection.findOne({ _id: givenId }).exec();

    if (!nft) return res.status(404).json({ message: 'nft not found' });



}


module.exports = { getNfts, createNewAsset, createAsset };