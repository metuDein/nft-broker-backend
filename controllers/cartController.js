const  Cart = require('../model/Cart');



const addToCart = async (req, res) => {
    const {userAddress, itemImage, itemName, quantity, itemId, price}  = req.body;

    if(!userAddress ||  !itemImage ||  !quantity ||  !itemId || !price || !itemName) return res.status(400).json({message : 'all field required'});


    const duplicate = await Cart.find({  paid : false, cartOwner : userAddress});


    if(duplicate) {
        duplicate.quantity = duplicate.quantity + quantity;

        duplicate.price = duplicate.quantity * duplicate.price;

        const result1 = await duplicate.save()

        if(!result1) return res.status(400).json({message : 'failed'});

        return res.status(200).json({message : 'Item Added'});

    }else{
        const result = await Cart.create({ cartOwner : userAddress, itemImage : itemImage, quantity : quantity, itemId : itemId, itemName : itemName, price : price});

        if(!result) return res.status(400).json({message : 'failed'});

        return res.status(200).json({message : 'Item Added'});
    }




    
}


module.exports = {
    addToCart,
}