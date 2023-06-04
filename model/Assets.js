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
    blockChain : String,
    activities : {
        txtype : String,
        txDate : {

        },
        amount : Number,
        shortDescription : String
    },
    description: {
        type : String,
        default : 'N/a'
    } 

},
{
    timestamps : true
}
)


module.exports = mongoose.model('Assets', assets);