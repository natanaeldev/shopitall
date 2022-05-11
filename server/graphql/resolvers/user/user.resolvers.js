const {
  signUp,
  signIn,
  currentUser,
} = require("../../../model/user/user.model");

module.exports = {
  Query: {
    currentUser: (_, args, context) => {
      return currentUser(context.req);
    },
  },

  Mutation: {
    addNewUser: (_, { input }) => {
      const { firstname, lastname, email, username, password } = input;
      return signUp(firstname, lastname, email, username, password);
    },

    signIn: (_, { input }) => {
      const { username, password } = input;

      return signIn(username, password);
    },
  },
};
