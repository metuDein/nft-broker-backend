const whiteList = require('./whiteList');

const corsOptions = {
    origin : (origin, callback) => {
        if(whiteList.indexOf(origin) != -1 || !origin ){
            callback(null, true)
        }else{
            callback(new Error(' not allowed by Cors'));
        }
    },
    optionsSuccessStatus : 200
}

module.exports = corsOptions