const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchases = new Schema({
    itemName : String,
    date : {
        type : Date,
        default : Date.now()
    },
    quantity : Number,
    itemId : String,
    buyerAddress : String
});

module.exports = mongoose.model('Purchases', purchases); 