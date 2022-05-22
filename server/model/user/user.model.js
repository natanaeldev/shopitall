const { UserInputError } = require("apollo-server");
const User = require("../user/user.mongo");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signUp(firstname, lastname, email, username, password) {
  if (!firstname || !lastname || !email || !username || !password) {
    throw new UserInputError("Please enter the required fields.");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    firstname,
    lastname,
    email,
    username,
    password: hashedPassword,
  });

  return await newUser.save();
}

async function signIn(username, password) {
  if (!username || !password) {
    throw new UserInputError("Please enter the required field ");
  }

  const user = await User.findOne({ username: username });
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (!isPasswordCorrect) {
    throw new UserInputError("Password Incorrect");
  }

  return {
    token: jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    }),
  };
}

// async function currentUser(users) {
//   if (!users.headers.authorization) {
//     throw new UserInputError("Please login");
//   }

//   const token = users.headers.authorization || "";
//   // const user = getUser(token);

//   if (!user) throw new AuthenticationError("you must be logged in");

//   return { user };
// }

module.exports = {
  signUp,
  signIn,
  // currentUser,
};
