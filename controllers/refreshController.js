const Nftusers = require('../model/NftUsers');

const jwt = require('jsonwebtoken');

const refreshController = async(req, res) => {
    const cookies = req.cookies
    
    if(!cookies?.jwt) return res.status(400).json({message : 'no cookies found'});

    const refreshToken = cookies.jwt

    const user = await Nftusers.findOne({ refreshToken : refreshToken}).exec();

    if(!user) return res.status(403).json({message : 'no user found'});

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decode) => {
            if(err || decode.contractAddress !== user.contractAddress ) return res.status(403).json({message : 'no user found'});
            const roles = Object.values(user.roles);

            const accessToken = jwt.sign(
                {   
                    "userInfo"  : {
                        "contractAddress" : user.contractAddress,
                        "privateKey" : user.privateKey,
                        "roles" : roles 
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn : "60s"}
            )

            res.status(200).json({accessToken, roles});
        }
    )
}

module.exports = {refreshController}