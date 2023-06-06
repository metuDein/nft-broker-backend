const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userAssets = new Schema({
    ownerAddress : {
        type : String,
        required : true
    },
    ownedItem: {
       item : { itemId: String,
        itemName: String,
        Quantity: Number,
        itemPrice: String,
        date: {
            type: Date,
            default: Date.now
        },
        netWork: String}
    },
    boughtItems : {
        item : {itemId: String,
        itemName: String,
        Quantity: Number,
        itemPrice: String,
        date: {
            type: Date,
            default: Date.now
        },
        netWork: String}
    }
})

module.exports = mongoose.model('UserAssets', userAssets);