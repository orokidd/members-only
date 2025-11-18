require("dotenv").config();

const express = require("express");
const path = require("path")
const session = require("express-session")
const passport = require("passport")

const pool = require("./models/pool")
const initializePassport = require("./config/passport")

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport, pool);