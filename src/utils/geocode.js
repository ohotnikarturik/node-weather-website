const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoib2hvdG5pa2FydHVyaWsiLCJhIjoiY2s4dXB2YXNsMDZmajNxa2RhcnJvZ3Z2aSJ9.jk8Z01Kg95VdcYeZTAo1HQ&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to geocode service!", undefined);
    } else if (!response.body.features.length) {
      callback("Unable to find", undefined);
    } else {
      const [longtitude, latitude] = response.body.features[0].center;
      const {place_name} = response.body.features[0];
      callback(undefined, {
        latitude: latitude,
        longtitude: longtitude,
        location: place_name,
      })
    }
  })
};

module.exports = geocode