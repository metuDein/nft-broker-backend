const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const { join } = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;


const logEvent = async (message, logFileName) => {
    const date = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${date}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(join(__dirname, '..', 'logs', logFileName), logItem);

    } catch (error) {
        console.log(error)
    }
}

const logger = (req, res, next) => {
    console.log(`${req.method}\t${req.path}\t${req.origin}`)
    logEvent(`${req.method}\t${req.path}\t${req.origin}`, 'reqlogs.txt');
    next();
}



module.exports = {
    logEvent,
    logger
}


