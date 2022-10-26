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
  addedCueCallback(getCurrentFogCueCount());
  res.send("Fog Added, current Cue: " + getCurrentFogCueCount());
});
function addedCueCallback(cueCount) {
  if (
    parsedJSON.addedCueCallback !== undefined &&
    parsedJSON.addedCueCallback.url !== undefined &&
    parsedJSON.addedCueCallback.param !== undefined
  ) {
    log(
      "Calling url:" +
        parsedJSON.addedCueCallback.url +
        "?" +
        parsedJSON.addedCueCallback.param +
        "=" +
        cueCount
    );
    apicaller
      .get(
        parsedJSON.addedCueCallback.url +
          "?" +
          parsedJSON.addedCueCallback.param +
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

export function fogStartCallback(cueCount) {
    if (
      parsedJSON.fogStartCallback !== undefined &&
      parsedJSON.fogStartCallback.url !== undefined &&
      parsedJSON.fogStartCallback.param !== undefined
    ) {
      log(
        "Calling url:" +
          parsedJSON.fogStartCallback.url +
          "?" +
          parsedJSON.fogStartCallback.param +
          "=" +
          cueCount
      );
      apicaller
        .get(
          parsedJSON.fogStartCallback.url +
            "?" +
            parsedJSON.fogStartCallback.param +
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
