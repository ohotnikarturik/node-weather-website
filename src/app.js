const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const port = process.env.PORT || 3000;

// Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlerbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve for assets
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Artur",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Artur",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    helpText: "If you need some help, just contact me!",
    name: "Artur",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must to provide an address!" });
  }
  geocode(
    req.query.address,
    (error, { latitude, longtitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longtitude, (error, forecastData, weatherImg) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
          weatherImg,
        });
      });
    }
  );

  // forecast(req.query.address, (error, forecastData) => {
  //   if(error) {
  //     return res.send({error})
  //   }

  //   res.send({ forecast: forecastData, address: req.query.address});
  // })
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Artur",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Artur",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
