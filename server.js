const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

console.log(db.select("*").from("users"));

const app = express();

app.use(express.json());
app.use(cors());

//for home page
app.get("/", (req, res) => {
  res.send("it is working");
});

//post request for the sign in page
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

//post request for the registering page
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

//get request for the profile id
app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, db);
});

//put request because updating the entires
app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});

/*
---- endpoints that need to be created ----
---- Tested using Postman ----

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user object
/profile/:userID --> GET = user information
/image --> PUT (update) = user 


*/
