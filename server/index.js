const fs = require("fs");
const path = require("path");
const url = require("url");
const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const morgan = require("morgan");
const session = require("express-session");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const app = express();

app.set("port", process.env.PORT || 3001);

app.use("/public", express.static(path.join(__dirname, "public")));


app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/views");

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(expressValidator());
app.use(morgan("dev"));
app.use(
  session({
    secret: "you-should-REALLY-change-this",
    resave: false,
    saveUninitialized: false
  })
);

mongoose.connect("mongodb://localhost:27017/albumsdb");
mongoose.connection.on("error", function handleDBErrors(err) {
  console.error("DB Error", err);
})

app.use("/", require("./routes/newAlbum"));
app.use('/', require('./routes/albums'));

if (require.main === module) {

  app.listen(app.get("port"), err => {
    if (err) {
      throw err;
      exit(1);
    }

    console.log(
      `Node running in ${app.get("env")} mode @ http://localhost:${app.get(
        "port"
      )}`
    );
  });
}

mongoose.connection.once('open', function(){
  console.log('CONNECTED');
})

module.exports = app;
