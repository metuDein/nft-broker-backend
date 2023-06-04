require('dotenv').config()
const express = require('express');
const app = express();
const moralis = require('moralis').default
const PORT = process.env.PORT || 3500;
const mongoose = require('mongoose')
const connectDb = require('./config/dbConn');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const {join} = require('path');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const { logger } = require('./middleware/logEvents');
const  errorHandler  = require('./middleware/errorHandler');



connectDb()

app.use(logger);
app.use(cookieParser())

app.use(express.urlencoded({extended : false}));
app.use(express.json())


// app.use(credentials);
app.use(cors(corsOptions))
app.use('/creatanasset', require('./routes/createnewuserassets'));

app.use('/nft', require('./routes/api/nfts'));
app.use('/assets', require('./routes/api/asset'));
app.use('/getcollection', require('./routes/getCollection'));
app.use('/getcollectionassets', require('./routes/getCollectionAssets'));
app.use('/assetsget', require('./routes/assetsDisplay'));
app.use('/getnft', require('./routes/nftdata'));
app.use('/display', require('./routes/displayNft'));
app.use('/getother', require('./routes/getOther')); 
app.use('/trending', require('./routes/trending'));

// auth route
app.use('/auth', require('./routes/auth'));
app.use('/getuser', require('./routes/getUserWallet'));
app.use('/getuserassets', require('./routes/getUserAssets'));
app.use('/createusernft', require('./routes/api/userAssets'));


// home page data
app.use('/getmoralisnft', require('./routes/moralis'));
app.use('/homepagenft', require('./routes/homepageData'));
app.use('/displayprice', require('./routes/displayFloorPrices'));



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

app.use(errorHandler)

moralis.start({
    apiKey :'IBfgrhz6Z9enJorfKKZgL0LfLZn8C8XBuKqXKqbJO1zUb69xiTUIA9iJwUAiqn2H'
}).then(() => {
    
mongoose.connection.once('open', () => {
    console.log('connected to mongoDb');
    app.listen(PORT, () => {    console.log(`app running on ${PORT}`);})
})

})