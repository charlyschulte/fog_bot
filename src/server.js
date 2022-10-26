const { addFog, getCurrentFogCueCount } = require("./fog");
const express = require("express");
const parsedJSON = require("../settings.json");
const { log } = require("./log");
const axios = require("axios");
const app = express();
const apicaller = axios.create({
  timeout: 1000,
});
app.get("/fog", (req, res) => {
  addFog();
  callApi(getCurrentFogCueCount());
  res.send("Fog Added, current Cue: " + getCurrentFogCueCount());
});
function callApi(cueCount) {
  if (
    parsedJSON.callback !== undefined &&
    parsedJSON.callback.url !== undefined &&
    parsedJSON.callback.param !== undefined
  ) {
    log(
      "Calling url:" +
        parsedJSON.callback.url +
        "?" +
        parsedJSON.callback.param +
        "=" +
        cueCount
    );
    apicaller
      .get(
        parsedJSON.callback.url +
          "?" +
          parsedJSON.callback.param +
          "=" +
          cueCount
      )
      .then((response) => {
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
function runApi() {
  app.listen(3000, () => {
    log("Server is up!");
  });
}
exports.runApi = runApi;
