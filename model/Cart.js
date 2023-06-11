const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const cart = new Schema({
    cartOwner : {
        type : String,
        required : true
    },
    
    itemId : String,
    itemName : {
        type : String,
        default : 'cartItem' 
    },
    itemImage : String,
    price : Number, 
    quantity : Number, 
    paid  :{
        type : Boolean,
        default : false
    },

    date : {
        type : Date,
        defualt : Date.now()
    }
        
})

module.exports = mongoose.model('Cart', cart);