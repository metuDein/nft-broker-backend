const RequestMessage = require('../model/RequestMessages');
const Nftusers = require('../model/NftUsers');
const Assets = require('../model/Assets')




const getAllRequestMessage = async (req, res) => {
    
    const messages = await RequestMessage.find()
    
    if(!messages) return res.status(204).json({message : 'no message'});
    
    res.status(200).json(messages);

} 
const sendMessage = async (req, res) => {
    const {image, itemName, title, body, senderAddress, receiver} = req.body

    if(!title || !body || !senderAddress || !receiver) return res.status(400).json({message : 'all fields required'});

    const user = await Nftusers.findOne({ contractAddress : receiver });

    if(!user)  return res.status(400).json({message : 'user no found '});

    const result = await RequestMessage.create({ image : image, title : title,  body : body, send_from :  senderAddress, reciever  : user.contractAddress, asset : itemName});
    
    if(!result) return res.status(400).json({message : 'request failed'});

    res.status(200).json({ message : 'request successful'});
}

const deleteMessage = async(req, res) => {
    const {id}= req.body
    if(!id) return res.status(400).json({message : 'id required'});

    const result = await RequestMessage.deleteOne({_id : id});


    if(!result) return res.status(400).json({message : 'delete failed'});

    res.status(200).json({messages : 'delete successful'});

}

const getMessage = async (req, res) => {
    
    const {id} = req.params;

    const message = await RequestMessage.findOne({ reciever : id}).exec();
    
    if(!message) return res.status(204).json({message : 'no message'});
    
    res.status(200).json(message);

} 


module.exports = {
    getAllRequestMessage,
    deleteMessage,
    getMessage,
    sendMessage
}