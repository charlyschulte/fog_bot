const {runFogCue} = require('./src/fog');
const {runApi} = require('./src/server');
runApi();
runFogCue();