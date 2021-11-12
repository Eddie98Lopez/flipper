const express = require("express");
const { getResources, addResource } = require("../models/dbHelpers");
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

router.get("/", async (req, res) => {
  try {
    const users = await getResources("users");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ ...error });
  }
});

router.post("/", async (req, res) => {
    console.log(req.body)
  try {
    const newUser = await addResource("users", req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ ...error });
  }
});
module.exports = router;
