const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const nftUsers = new Schema({
    userName: {
        type: String,
        default : 'new user'
    },
    userEmail : {
        type : String,
        default : ''
    },
    contractAddress: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    purchases : {
        purchaseItem : {
            id : String
        }
    },
    favorites: {
        item: {
            itemId: String,
            itemName: String,

        }

    },

    verified: {
        type: Boolean,
        default: false
    },
    transactable: {
        type: Boolean,
        default: false
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Admin: Number
    },
    privateKey: {
        type: String,
        required : true
    },

    cart: {
        item: {
            Quantity: Number,
            paid: {
                type: Boolean,
                default: false
            },
            itemId: String
        }

    },
    image : {
        type : String,
        default : ''
    },
    refreshToken: String,
});


module.exports = mongoose.model('Users', nftUsers);
