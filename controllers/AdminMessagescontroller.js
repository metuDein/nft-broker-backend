const RequestMessage = require('../model/RequestMessages');
const Nftusers = require('../model/NftUsers');
const Assets = require('../model/Assets')




const getAllRequestMessage = async (req, res) => {

    
    const messages = await RequestMessage.find()
    
    if(!messages) return res.status(204).json({message : 'no message'});
    
    res.status(200).json(messages);

} 

const userMessages = async (req, res) => {
    const {image, itemName, title, body, senderAddress} = req.body

    if(!title || !body || !senderAddress) return res.status(400).json({message : 'all fields required'});

    const admin = await Nftusers.find({ 'roles.Admin' : 5150  });

    const result = await RequestMessage.create({ image : image, title : title,  body : body, send_from :  senderAddress, reciever  : admin.contractAddress, asset : itemName});
    
    if(!result) return res.status(400).json({message : 'request failed'});

    res.status(200).json({ message : 'request successful'});

}
const userVerifcation = async (req, res) => {
    const {image, senderAddress} = req.body

    if(!image || !senderAddress) return res.status(400).json({message : 'all fields required'});

    const admin = await Nftusers.findOne({ 'roles.Admin' : 5150  });

    const result = await RequestMessage.create({ image : image, title : 'verification request', send_from : senderAddress, reciever  : admin.contractAddress, });
    
    if(!result) return res.status(400).json({message : 'request failed'});

    res.status(200).json({ message : 'request successful'});


}


module.exports = {
    userMessages,
    userVerifcation,
    getAllRequestMessage
}