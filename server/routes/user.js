require("dotenv").config();
const express = require("express");
const router = express.Router();
const knex = require("../knexfile-config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  const { firstname, lastname, email, username, password } = req.body;

  if (!firstname || !lastname || !email || !username || !password) {
    return res.status(400).send("Please enter the required fields.");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    firstname,
    lastname,
    email,
    username,
    password: hashedPassword,
  };

  knex("user")
    .insert(newUser)
    .then((data) => {
      res.status(200).send("registered succesfully");
    })
    .catch((error) => {
      res.status(400).send("Failed registration");
    });
});

router.post("/users/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Please enter the required field ");
  }

  knex("user")
    .where({ username: username })
    .first()
    .then((user) => {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      if (!isPasswordCorrect) return res.status(400).send("Wrong password");

      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({ token });
    })
    .catch((error) => {
      res.status(400).send("Invalid credentials");
    });
});

router.get("/users/current", (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }

  const authToken = req.headers.authorization.split(" ")[1];

  jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid auth token");
    }

    knex("user")
      .where({ username: decoded.username })
      .first()
      .then((user) => {
        delete user.password;
        res.json(user);
      });
  });
});

module.exports = router;
