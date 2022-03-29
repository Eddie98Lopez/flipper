const express = require("express");
//const restricted = require('../../restricted')
const { addResource } = require("../../models/dbHelpers");
const {
  hashPass,
  valRegister,
  usernameFree,
  checkUserExist,
  checkPass,
  valLogin,
  generateToken,
} = require("./authMiddleware");
const router = express.Router();

// middleware for validation
//middleware for password hashing
// helper functions to interact with the database

/* userShape = {
    username: '',
    password: ''
    organization: number
} */

/* user endpoints => methods:

"/" => get, post
"/id" => get, put, delete */
router.post(
  "/register",
  valRegister,
  usernameFree,
  hashPass,
  async (req, res) => {
    try {
      const newUser = await addResource("users", req.newUser);
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ ...error });
    }
  }
);

router.post("/login", valLogin, checkUserExist, checkPass, async (req, res) => {
  const { user_id, username, first_name, last_name, email } = req.user;
  try {
    const token = generateToken(req.user, process.env.JWT_SECRET);
    const user = {
      id: user_id,
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email,
    };

    res.status(200).json({ token: token, user: user });
    
  } catch (err) {
    res
      .status(500)
      .json({ message: "internal server error at token generation" });
  }
});

module.exports = router;
