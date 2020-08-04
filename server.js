const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

// connecting to the database using knex npm pkg
const db = knex({
  client: "pg", //the npm package we downloaded
  connection: {
    host: "127.0.0.1", //same thing as localhost
    user: "postgres",
    password: "123",
    database: "smartbrain",
  },
});

// starting point of our app
const app = express();

// using middleware for parsing the data
app.use(express.json());
app.use(cors());

// get request for the root route
app.get("/", (req, res) => res.send(db.users));
// post request for the signin route
app.post("/signin", (req, res) => signin.handleSignin(req, res, db, bcrypt));
// post req for the register route
app.post("/register", (req, res) =>
  register.handleRegister(req, res, db, bcrypt)
);
// get req for getting user profile id
app.get("/profile/:id", (req, res) => profile.handleProfileGet(req, res, db));
// put req for user image counting/no.of req/rank
app.put("/image", (req, res) => image.handleImage(req, res, db));
//post req for image through req.body
app.post("/imageurl", (req, res) => image.handleApiCall(req, res));

app.listen(process.env.PORT || 3000, () =>
  console.log(`app is running on port ${process.env.PORT}`)
);
