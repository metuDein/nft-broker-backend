const NftUsers = require('../model/NftUsers');




const updateUser = async(req,res) => {
    const {id} = req.body;

    if(!id) return res.status(403).json({message : 'user id required'});

    const user = await NftUsers.findOne({ _id : id}).exec();
    
    if(!user) res.status(401).json({message : 'user not found'});

    if(req.body.image) user.image = req.body.image;
    if(req.body.userName) user.userName = req.body.userName;
    if(req.body.userEmail) user.userEmail = req.body.userEmail; 

    const result = await user.save();

    if(!result) return res.status(400).json({message : 'update failed'});

    res.status(200).json({message : 'update successful'});
}



module.exports = updateUser 