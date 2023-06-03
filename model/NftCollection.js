const mongoose = require('mongoose');
const Schema = mongoose.Schema

const nftsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    categories: {
        type: [String],
        default: ['PFPs']
    },
    verified: {
        type: Boolean,
        default: true
    },

    floorPrice: {
        type: Number,
        required: true
    },
    floorPriceUsd: {
        type: Number
    },
    network: {
        type: String,
        required: true,
        default: 'ETH'
    },
    blockChain: {
        type: String,
        required: true
    },
    contractAddress: {
        type: String,
        required: true
    },
    trending: {
        type: Boolean,
        default: false
    },
    logo: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Nfts', nftsSchema); 