const axios = require('axios');
const fs = require('fs');
const Moralis = require('moralis').default;
const fsPromises = require('fs').promises;
const { join } = require('path');
const Assets =  require('../model/Assets')


const NftCollection = require('../model/NftCollection');


const options = {
    method: 'GET',
    url: 'https://top-nft-collections.p.rapidapi.com/api/get-collections-ranking',
    params: {
        offset: '400',
        limit: '500',
        sortBy: 'volume',
        order: 'desc',
        period: '7d',
        network: 'Ethereum'
    },
    headers: {
        'X-RapidAPI-Key': '55f4f4c5a2msh736610c0bc76f18p1ac033jsn885310dafd08',
        'X-RapidAPI-Host': 'top-nft-collections.p.rapidapi.com'
    }
};

const homepageOption = {
    method: 'GET',
    url: 'https://api.opensea.io/api/v1/assets?order_direction=desc&limit=2',

};



const getNftData = async (req, res) => {
    try {
        const response = await axios.request(options);
        if (!fs.existsSync(join(__dirname, '..', 'model', 'nft.json'))) {
            await fsPromises.mkdir(join(__dirname, '..', 'model', 'nft.json'));
        }
        const { data } = response.data;
        const { collections } = data;


        const alldata = [...nftDb.nfts, ...collections]
        nftDb.setNfts(alldata)
        console.log(typeof (nftDb.nfts));

        const result = await fsPromises.appendFile(join(__dirname, '..', 'model', 'nft.json'), (JSON.stringify(nftDb.nfts)));

        if (!result) return res.status(400).json({ message: 'writefile failed' });
        res.status(200).json({ message: 'data placed successfully' });


    } catch (error) {
        console.error(error);
    }
}
const getNftOther = async (req, res) => {
    try {
        const response = await axios.get('https://api.opensea.io/api/v1/assets');
        const assets = response.data.assets;

        assets.forEach((asset) => {
            const imageUrl = asset.image_url;
            const price = asset.sell_orders ? asset.sell_orders[0].current_price : 'Not for sale';
            const tokenId = asset.token_id;
            const contractAddress = asset.asset_contract.address;
            const creatorUsername = asset.creator.user?.username;
            const name = asset.name;

            console.log('Image URL:', imageUrl);
            console.log('Price:', price);
            console.log('Token ID:', tokenId);
            console.log('Contract Address:', contractAddress);
            console.log('Creator Username:', creatorUsername);
            console.log('Name:', name);
            console.log('---');
        });
    } catch (error) {
        console.error(error);
    }
}

const getHomepageData = async (req, res) => {
    const nft = await Assets.find().limit(40).exec();
    if (!nft) return res.status(204);
    res.json(nft);
}
const getTrendingData = async (req, res) => {
    const nft = await NftCollection.find().limit(7).exec();
    if (!nft) return res.status(204);
    res.json(nft);
}

const displayFloorPrice = async (req, res) => {
    const { nfts } = nftDb
    for (let i = 0; i < nfts.length; i++) {
        if (!nfts[i].floorPrice || !nfts[i].logo) {
            continue;
        }
        console.log(nfts[i].floorPrice, '\t', nfts[i].logo);
    }
    res.status(200).json({ mesage: 'finished' });
}

const getDatamoralis = async (req, res) => {
    try {
        const { query } = req;


        let NFTs;

        if (query.cursor) {
            NFTs = await Moralis.EvmApi.nft.getContractNFTs({
                address: query.address,
                chain: query.chain,
                cursor: query.cursor,
                limit: 10,
            });
        } else {
            NFTs = await Moralis.EvmApi.nft.getContractNFTs({
                address: query.address,
                chain: query.chain,
                limit: 10,
            });
        }

        const result = NFTs.raw;

        return res.status(200).json({ result });
    } catch (e) {

        console.log(e);
        console.log("something went wrong");
        return res.status(400).json();

    }
}

const displayNftData = async (req, res) => {
    const { nfts } = nftDb
    let result;
    for (let i = 0; i < nfts.length; i++) {
        const duplicate = await NftCollection.findOne({ name: nfts[i].name, contractAddress: nfts[i].contractAddress, logo: nfts[i].logo }).exec();
        if (duplicate) {
            continue;
        } else if (!nfts[i].name || !nfts[i].contractAddress || !nfts[i].floorPrice || !nfts[i].blockchain || !nfts[i].logo) {
            continue;
        }

        result = await NftCollection.create({ name: nfts[i].name, categories: nfts[i].categories, floorPrice: nfts[i].floorPrice, floorPriceUsd: nfts[i].floorPriceUsd, blockChain: nfts[i].blockchain, contractAddress: nfts[i].contractAddress, logo: nfts[i].logo });

    }
    if (!result) return res.status(400).json({ message: 'failed request' });
    res.status(200).json({ message: 'upload completed' });

}

module.exports = { getNftData, displayNftData, displayFloorPrice, getHomepageData, getTrendingData, getDatamoralis, getNftOther } 