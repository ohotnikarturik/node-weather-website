const request = require("request");

const forecast = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=5f9d2200c765ef1e3368436f4a685525&query=${address}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, response.body);
    }
  });
};

module.exports = forecast;
