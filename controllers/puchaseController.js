const Purchases = require('../model/purchases');
const Nftusers = require('../model/NftUsers');
const Cart = require('../model/Cart');

const addTopurchases = async (req, res) => {
    const { itemName, quantity, itemId, buyerAddress, total } = req.body;
    if (!itemName || !quantity || !itemId || !buyerAddress || !total) return res.status(400).json({ message: 'all field required' });

    const result = await Purchases.create({
        itemName: itemName,
        quantity: quantity,
        itemId: itemId,
        buyerAddress: buyerAddress
    })

    if (!result) return res.status(403).json({ message: 'transaction failed' });

    const buyer = await Nftusers.findOne({ contractAddress: buyerAddress }).exec()

    const newBalance = buyer.balance - total

    buyer.balance = newBalance;
    const result2 = buyer.save();

    if (!result2) return res.status(403).json({ message: 'transaction failed' });

    const cartItem = await Cart.findOne({ _id: itemId }).exec();

    if (cartItem) {

        cartItem.paid = true;

        const result3 = await cartItem.save()

        if (!result3) return res.status(403).json({ message: 'transaction failed' });
        return res.status(200).json({ message: 'transaction succeded' });
    }

    res.status(200).json({ message: 'transaction succeded' });
}

module.exports = addTopurchases;