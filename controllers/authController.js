const NftUsers = require('../model/NftUsers');
const jwt = require('jsonwebtoken');


const authController = async (req, res) => {
    const { contractAddress, privateKey } = req.body;

    if (!contractAddress || !privateKey) return res.status(400).json({ message: 'please all fields are required' });

    const user = await NftUsers.findOne({ contractAddress: contractAddress }).exec();
    
    try {
        if ((!user)) {
            const result = await NftUsers.create({ contractAddress: contractAddress, privateKey: privateKey });

            if (!result) return res.status(402).json({ message: 'registration failed' })
            


            res.status(201).json({message  : 'user created successfully'});


        } else {
            const roles = Object.values(user.roles);
            const balance = Object.values(user.balance)
            const accessToken = jwt.sign(
                        {   
                            "userInfo"  : {
                                "contractAddress" : contractAddress,
                                "privateKey" : privateKey,
                                "roles" : roles 
                            },
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn : '1h'}
                );

            const refreshToken = jwt.sign({
                    "contractAddress" : contractAddress
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn : '1d'}
            ) 

            duplicate.refreshToken = refreshToken
            
            const result = await duplicate.save();
            


            res.cookie('jwt', refreshToken, {httpOnly : true, sameSite : 'None', maxAge : 24 * 60 * 60 * 1000});
            res.status(200).json({accessToken, user});
            
        }
    } catch (error) {
        console.log(error.name, error.message);
    }

}

const getUserWallet = async (req, res) => {
    const {contractAddress} = req.body 

    if(!contractAddress) return res.status(400).json({message : 'wallet address required'})

    const user = await NftUsers.findOne({ contractAddress : contractAddress}).exec()

    if(user){
        const roles = Object.values(user.roles);
        const balance = user.balance;
        const privateKey = user.privateKey;
        const uid = user._id
        const accessToken = jwt.sign(
                    {   
                        "userInfo"  : {
                            "contractAddress" : contractAddress,
                            "privateKey" : privateKey,
                            "roles" : roles 
                        },
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn : '1h'}
            );

        const refreshToken = jwt.sign({
                "contractAddress" : contractAddress
        },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn : '1d'}
        ) 

        user.refreshToken = refreshToken
        
        
        const result = await user.save();
        
        

        res.cookie('jwt', refreshToken, {httpOnly : true, sameSite : 'None', maxAge : 24 * 60 * 60 * 1000});
        res.status(200).json({user, accessToken});

    }else{
        return res.status(204).json({message : 'no user found'});
    }
    
} 


module.exports = {
    authController,
    getUserWallet
}