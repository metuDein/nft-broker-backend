const Assets = require('../model/Assets');
const NftUsers = require('../model/NftUsers');
const RequestMessages = require('../model/RequestMessages');
const Cart = require('../model/Cart')




const getallAssets = async (req, res) => {
    const assets = await Assets.find();
    if(!assets) return res.status(204).json({message : 'no assets'})

    res.status(200).json(assets);
}


const getAllusers = async (req, res) => {
    const users = await NftUsers.find();

    if(!users) return res.status(204).json({message : 'no users'})
    res.status(200).json(users);


}
const getAllmessages = async (req, res) => {
    const messages = await RequestMessages.find();

    if(!messages) return res.status(204).json({message : 'no messages'})
    res.status(200).json(messages);


}
const getAllcartitems = async (req, res) => {
    const cartitems = await Cart.find();

    if(!cartitems) return res.status(204).json({message : 'no cartitems'})
    res.status(200).json(cartitems);

}




module.exports = {
    getallAssets,
    getAllusers,
    getAllmessages,
    getAllcartitems
}


