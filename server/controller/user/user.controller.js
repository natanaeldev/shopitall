require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const { signIn, signUp, currentUser } = require("../../model/user/user.model");

async function httpSignUp(req, res) {
  const { firstname, lastname, email, username, password } = req.body;

  if (!firstname || !lastname || !email || !username || !password) {
    return res.status(400).send("Please enter the required fields.");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = {
    id: uuidv4(),
    firstname,
    lastname,
    email,
    username,
    password: hashedPassword,
  };

  signUp(newUser)
    .then((response) => {
      console.log(response);
      res.status(200).json({
        user: response,
      });
    })
    .catch((error) => {
      res.status(400).json({ messsage: "Failded to registed", error: error });
    });
}

async function httpSignIn(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Please enter the required field ");
  }

  signIn(username)
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
}

async function httpCurrentUser(req, res) {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }

  const authToken = req.headers.authorization.split(" ")[1];

  jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid auth token");
    }

    currentUser(decoded.username).then((user) => {
      delete user.password;
      res.status(200).json({ user });
    });
  });
}

module.exports = {
  httpSignIn,
  httpSignUp,
  httpCurrentUser,
};
