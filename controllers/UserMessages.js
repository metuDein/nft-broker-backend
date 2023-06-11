const RequestMessage = require('../model/RequestMessages');
const Nftusers = require('../model/NftUsers');
const Assets = require('../model/Assets')




const getAllRequestMessage = async (req, res) => {

    const { contractAddress} = req.body;
    const messages = await RequestMessage.find({ reciever : contractAddress})
    
    if(!messages) return res.status(204).json({message : 'no message'});
    
    res.status(200).json(messages);

} 
const deleteMessage = async (req, res) => {

    const { id } = req.params;
    
    console.log(id)

    if(!id) return res.status(400).json({message :'all fields required'})
    const messages = await RequestMessage.findOne({ _id : id}).exec()
    
    if(!messages) return res.status(204).json({message : 'no message'});
    
    const result = await messages.deleteOne({_id : id});

    if(!result) return res.status(401).json({message : 'delete failed'});

    res.status(200).json({message : 'delete successful'});

} 

const getAMessage = async (req, res) => {

    const { id} = req.params;
    const messages = await RequestMessage.find({ _id : id})
    
    if(!messages) return res.status(204).json({message : 'no message'});
    
    res.status(200).json(messages);

} 

module.exports = {getAllRequestMessage, deleteMessage, getAMessage};