const Cart = require('../model/Cart');




const getUserCart = async (req, res) => {
    const { contractAddress } =  req.body;

    if(!contractAddress) return res.status(400).json({message : 'user address required'});

    const cartItems = await Cart.find({ cartOwner : contractAddress});

    if (!cartItems) return res.status(204).json({message : 'no cart items'});

    res.json({cartItems});
}

const deleteCartItem =  async (req, res) => {
    const { id } =  req.body;

    if(!id) return res.status(400).json({message : 'cart item id required'});

    const cartItem = await Cart.findOne({ _id : id}).exec();

    const result = cartItem.deleteOne({_id : id});

    if(!result)  res.status(400).json({message : 'delete failed'});

    res.status(200).json({message : 'item deleted'});
    
}

module.exports = {
    deleteCartItem,
    getUserCart
}