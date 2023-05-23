const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// always look for views folder in piblic
app.set("view engine", "hbs");
// setup if want to  use different path instead of views folder
app.set("views", viewsPath);
// use statuc path for connecting to html pages
app.use(express.static(publicDirectoryPath));
// Path setup for partials path
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App", //can be used as a variables inside the html
    name: "Shekhar Tayde",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Shekhar Tayde",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is some helpful text.",
    name: "Shekhar Tayde",
  });
});

app.get("/weather", geocode);

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help article not found.",
    name: "Shekhar Tayde",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Page not found.",
    name: "Shekhar Tayde",
  });
});

app.listen(8000, () => {
  console.log("Server is connected and running on port 8000");
});
