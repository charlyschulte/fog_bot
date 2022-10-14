
const axios = require("axios");
const parsedJSON = require('../settings.json');
const {log} = require('./log');
let FogQue=0;
const FogApi = axios.create({
    baseURL: parsedJSON.fogurl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
function getCurrentFogCueCount(){
    return FogQue;
}
async function requestfogmaschine() {
    let fogvalue = 0;
    response = await FogApi.get("/cm",{params:{"cmnd":"Status 10"}})
    fogvalue=response.data.StatusSNS.ANALOG.A0;
    if(fogvalue>18){
        log("Fog Turned on");
        runfogmaschine(true);
    }
    else{
        log("Fog Maschine is not ready yet");
        FogQue+=1;
    }
}
function addFog(){
    log("Added Fog");
    FogQue+=1;
    return;
}
function runFogCue(){
    log("Checking for new Fog currently in cue: "+FogQue)
    if(FogQue){
        FogQue-=1;
        requestfogmaschine();
    }
    setTimeout(runFogCue,parsedJSON.fogwaitingtime);
}
async function runfogmaschine(onOff=false){
    await FogApi.get("/cm",{params:{"cmnd":(onOff?"Power On":"Power Off")}});
    setTimeout(runfogmaschine,parsedJSON.fogruntime);
}
exports.runFogCue = runFogCue;
exports.addFog=addFog;
exports.getCurrentFogCueCount=getCurrentFogCueCount;