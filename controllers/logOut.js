const Nftusers  = require('../model/NftUsers');

const HandleLogOut = async (req, res) => {
    const cookies = req.cookies
    
    if(!cookies?.jwt) return res.status(200).json({message : 'no cookies found log out successful'});

    const refreshToken = cookies.jwt

    const foundUser = await Nftusers.findOne({ refreshToken : refreshToken}).exec();


    if(!foundUser) {
        
        res.clearCookie('jwt', {httpOnly : true, sameSite : 'None', maxAge : 24 * 60 * 60 * 1000});

       return res.status(200).json({message : 'no cookies found log out successful'});
    }


    foundUser.refreshToken = '';

    const result = await foundUser.save();

    if(!result) return res.status(400).json({message : 'logout failed'});

        res.clearCookie('jwt', {httpOnly : true, sameSite : 'None', maxAge : 24 * 60 * 60 * 1000});

       return res.status(200).json({message : 'log out successful'});

}



module.exports = { 
    HandleLogOut
}

