const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const nftUsers = new Schema({
    userName: {
        type: String
    },
    contractAddress: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    },
    assets: {
        allAssets: {
            itemData: {
                itemId: String,
                itemName: String,
                Quantity: Number,
                itemPrice: String,
                date: {
                    type: Date,
                    default: Date.now
                },
                netWork: String
            }
        },
        collectedAssets: {
            itemData: {
                itemId: String,
                itemName: String,
                Quantity: Number,
                itemPrice: String,
                date: {
                    type: Date,
                    default: Date.now
                },
                netWork: String
            }
        },
        createdAssets: {
            itemData: {
                itemId: String,
                itemName: String,
                Quantity: Number,
                itemPrice: String,
                date: {
                    type: Date,
                    default: Date.now
                },
                netWork: String
            }
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
    refreshToken: String,
});


module.exports = mongoose.model('Users', nftUsers);
