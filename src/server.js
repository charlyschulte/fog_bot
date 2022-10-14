const { addFog,getCurrentFogCueCount } = require('./fog');
const express = require('express')
const{log} = require('./log'); 
const app = express()
app.get('/fog', (req, res) => { addFog(); res.send('Fog Added, current Cue: '+getCurrentFogCueCount()) })
function runApi(){
    app.listen(3000, () => { 
        log('Server is up!') 
    })
}
exports.runApi=runApi;
