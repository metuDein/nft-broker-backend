const mongoose = require('mongoose');
const NftCollection = require('./NftCollection')
const Schema = mongoose.Schema;





const assets = new Schema({
    token_address: {
        type: String,
        required: true,
    },
    token_id: {
        type: String,
        required: true,
    },
    block_number_minted: {
        type: String,
        required: true,
    },
    price: {
        type: Number
    },
    name: {
        type: String,
        required: true,
    },
    token_uri: {
        type: String,
    },

    image: {
        type: String,
        required: true,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: NftCollection
    }
})


module.exports = mongoose.model('Assets', assets);