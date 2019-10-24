const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");

const routes = require("./routes");

// instance of express
const app = express();

// : cors options
var corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"]
};

// : app middleware
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
require("./passport")(passport);
// : serialize user
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
// : routes
app.use("/api/v1/", routes);

// : assigning port
const port = process.env.PORT || 4000;

// : listening to the `port`
app.listen(port, () => {
  console.log("app is started and running on port " + port);
});
