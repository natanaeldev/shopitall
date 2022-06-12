const express = require("express");
const {
  httpSignIn,
  httpSignUp,
  httpCurrentUser,
} = require("../../controller/user/user.controller");
const router = express.Router();

router.get("/currentuser", httpCurrentUser);
router.post("/signin", httpSignIn).post("/signup", httpSignUp);

module.exports = router;
