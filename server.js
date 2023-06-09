require('dotenv').config();
const express = require('express');
const app = express();
const {join} = require('path');
const credentials = require('./middleware/credentials');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const  errorHandler  = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDb = require('./config/dbConn');
const verifyJwt = require('./middleware/verifyJWT');
const PORT = process.env.PORT || 3500;





connectDb()

app.use(logger);


app.use(credentials);


app.use(cors(corsOptions))



app.use(express.urlencoded({extended : false}));
app.use('/', express.static(join(__dirname, '/public')))

app.use(express.json())


app.use(cookieParser())







// display data
// app.use('/allassets', require('./routes/allassets'));
// app.use('/allusers', require('./routes/allusers'));
// app.use('/allmessages', require('./routes/allmessages'));
// app.use('/allcartitems', require('./routes/allcartitems'));





app.use('/getanasset', require('./routes/getanasset'));

app.use('/trendingassets', require('./routes/getTrendingAssets'));
app.use('/getallassets', require('./routes/getallAssets'));
app.use('/user', require('./routes/api/userAssets'));
app.use('/getcollection', require('./routes/getCollection'));
app.use('/getcollectionassets', require('./routes/getCollectionAssets'));
// app.use('/assetsget', require('./routes/assetsDisplay'));
app.use('/getnft', require('./routes/nftdata'));
app.use('/display', require('./routes/displayNft'));
app.use('/getother', require('./routes/getOther')); 
app.use('/trending', require('./routes/trending'));
app.use('/homepagenft', require('./routes/displayFloorPrices'));
app.use('/creatanasset', require('./routes/createnewuserassets'));


// access controller
app.use('/auth', require('./routes/auth'));
app.use('/logout', require('./routes/logOut'));
app.use('/refresh', require('./routes/refresh'));


app.use('/getuser', require('./routes/getUserWallet'));
app.use('/getuserassets', require('./routes/getUserAssets'));
app.use('/', require('./routes/root'));

// app.use(verifyJwt)
// auth route
app.use('/nft', require('./routes/api/nfts'));
app.use('/usergetallassets', require('./routes/api/usergetAllAssets'));
app.use('/adminassets', require('./routes/api/AdminAssets'));
app.use('/usereditprofile', require('./routes/api/userEditProfile'));
app.use('/assets', require('./routes/api/asset'));
app.use('/adminmessages', require('./routes/api/getAllRequestMessage'));
app.use('/usermessages', require('./routes/api/userMessages'));
app.use('/messagecontroller', require('./routes/api/messageController'));
app.use('/cart', require('./routes/api/cart'));
app.use('/adminuser', require('./routes/api/AdminUser'));
app.use('/addmoreinfo', require('./routes/api/userAddmore'));
app.use('/createusernft', require('./routes/api/userAssets'));
app.use('/usermessage', require('./routes/api/userMessage'));
app.use('/purchase', require('./routes/api/purchase'));
app.use('/userverification', require('./routes/api/userVerification'));
app.use('/usercart', require('./routes/api/userCartControl'));









app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(join(__dirname, 'views', '404.html'))
    }else if(req.accepts('json')){
        res.json({message : '404 not found'});
    }else{
        res.type('txt').send('404 not found');
    }
})

app.use(errorHandler);






    
mongoose.connection.once('open', () => {
    console.log('connected to mongoDb');
    app.listen(PORT, () => {    console.log(`app running on ${PORT}`);})
})
