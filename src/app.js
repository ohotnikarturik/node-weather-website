const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

const forecast = require('./utils/forecast')

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
    helpText: "If you need some help, just ask",
    name: "Artur",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must to provide an address!" });
  }
  
  forecast(req.query.address, (error, forecastData) => {
    if(error) {
      return res.send({error})
    }

    
    res.send({ data: forecastData, address: req.query.address});
  })

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

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
