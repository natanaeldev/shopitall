const User = require("../user/user.mongo");

async function signUp(newUser) {
  const { id, firstname, lastname, email, username, password } = newUser;

  let userEmail = await User.findOne({ email });

  if (userEmail) {
    return { message: "Please use a unique email" };
  }

  let user = await new User({
    id,
    firstname,
    lastname,
    email,
    username,
    password,
  }).save((error, result) => {
    if (error) {
      return error;
    } else {
      return result;
    }
  });

  return {
    user,
    message: "register Sucessfully",
  };
}

async function signIn(username) {
  const user = await User.findOne({ username: username });
  return user;
}

async function currentUser(username) {
  const currentUser = await User.findOne(
    { username },
    { __v: 0, _id: 0, password: 0 }
  );

  return currentUser;
}

module.exports = {
  signUp,
  signIn,
  currentUser,
};
