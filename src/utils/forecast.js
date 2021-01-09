const request = require("request");

const forecast = (latitude, longtitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=5f9d2200c765ef1e3368436f4a685525&query=${latitude},${longtitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        `Current temperature is: ${response.body.current.temperature} degress out. 
         Feels like: ${response.body.current.feelslike} degress out. 
         ${response.body.current.weather_descriptions[0]}.
         Humidity is: ${response.body.current.humidity}%. 
         `,
        `${response.body.current.weather_icons[0]} `
      );
    }
  });
};

module.exports = forecast;
