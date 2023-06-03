const mongoose = require('mongoose');
const Schema =  mongoose.Schema;


const nftUsers = new Schema({
    user : {
        type : String
    },
    contractAddress : {
        type : String,
        required : true
    },
    balance : {
        type  : Number,
        default : 0
    },
    assets : {
        allAssets :{
        type : String,
        },
        collectedAssets  : {
            type : String
        },
        CreatedAssets : {
            type : String
        }
    },
    favorites : {
        type : String,
    },
    verified : {
        type : Boolean,
        default : false
    },
    transactable : {
        type : Boolean,
        default : false
    },
    roles : {
        User : {
            type : Number,
            default : 2001
        },
        Admin : Number
    },
    privateKey : {
        type : String,
    },
    favourite: {
        item : String,
    },
    cart : {
        item  : String,
        Quantity : Number,
        paid : {
            type : Boolean,
            default  :false
        },
        itemprice : Number
    },
    refreshToken : String,
});


module.exports  = mongoose.model('Users', nftUsers);
