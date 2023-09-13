require("dotenv").config();
const express = require("express");
const port = 5620 || process.env.PORT;
const db = require("./config/mongoose");
const passport = require("passport");
const passportJwt = require("./config/passport-jwt-strategy");
const GoogleStrategy = require("./config/passport-google-oauth20");
const session = require("express-session");
const LocalStrategy = require("./config/passport-local");
const path = require("path");
let cookieParser = require("cookie-parser");
const app = express();
/*
if (process.env.MODE == "production") {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
}
*/
const cors = require("cors");
app.use(cors());
app.use(cookieParser())
app.use(express.json());

app.use(session({
  secret: `${process.env.SECRET}`,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", require("./routes/api/index"));

app.use(express.static(path.resolve(__dirname, "client", "build")));

//express will serve up the index.html file if routes doesnot match-:
app.get("*", (req, res) => {
  // console.log("Inside me");
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, function () {
  console.log(`Server is running on port-:${port}`);
});
