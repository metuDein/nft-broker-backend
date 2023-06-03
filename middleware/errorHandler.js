const {logEvent} = require('./logEvents');


const errorHandler = (err, req, res, next) => {
    console.log(`${err.name} : ${err.message}`)
    logEvent(`${err.name} : ${err.message}`, 'errlogs.txt');
    res.status(500).send(err.message);
}

module.exports = errorHandler;
