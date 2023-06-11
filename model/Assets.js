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
        type: Number,
        default : 0.5
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
<<<<<<< HEAD
    categories : {
        type  : String,
=======
    
    categories : {
        type : String,
>>>>>>> 8a9a6e200e7b561d7c84fce1459301dd59a853b1
        default : 'NFTs'
    },
    trending : {
        type : Boolean,
        default : false
<<<<<<< HEAD
    },
    network :{
        type :String,
        default : 'Ethereum'
    },

    description  : {
        type : String,
        default :""
=======
>>>>>>> 8a9a6e200e7b561d7c84fce1459301dd59a853b1
    }
},
{
    timestamps : true
}
)


module.exports = mongoose.model('Assets', assets);
