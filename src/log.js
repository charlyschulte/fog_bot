const parsedJSON = require('../settings.json');
function log(log){
    if(parsedJSON.debug)
        console.log(log)
}
exports.log = log;