const Nftusers = require('../model/NftUsers');


const  addMore = async (req, res) => {
    const { contractAddress } = req.body;

    if(!contractAddress) return res.status(400).json({message : 'contractAddress'});

    const user = await Nftusers.findOne({contractAddress : contractAddress}).exec();

    if(!user) return res.status(204).json({message : 'user not found'});
    
    if(req?.body?.userEmail) user.userEmail = req.body.userEmail;
    if(req?.body?.userName) user.userName = req.body.userName;
    
}

module.exports = addMore;