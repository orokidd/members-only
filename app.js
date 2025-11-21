require("dotenv").config();

const express = require("express");
const path = require("path")
const session = require("express-session")
const passport = require("passport")

const pool = require("./models/pool")
const initializePassport = require("./config/passport")

const authRouter = require("./routes/auth.routes")
const indexRouter = require("./routes/index.routes")
const membershipRouter = require("./routes/membership.routes")
const postRouter = require("./routes/post.routes")

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

app.use("/", authRouter)
app.use("/", indexRouter)
app.use("/", membershipRouter)
app.use("/", postRouter)

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on port 3000");
});
