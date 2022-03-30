const express = require("express");
const {
  getResources,
  getResourceById,
  addResource,
} = require("../../models/dbHelpers");
const router = express.Router();
const {valHomeFields} = require('./homeMiddleware')
/*
//middleware for validation
//helper functions to interact with database

homeShape = {
    nickname: '',
    address: '' ,
    status_id: reference key,
    author_id: reference key,
    notes: ''
}

endpoints => method:
"/" => get, post
"/:id" => get, put, delete

*/

router.get("/", async (req, res) => {
  try {
    const homes = await getResources("homes");
    res.status(200).json(homes);
  } catch (error) {
    res.status(500).json("internal server error");
  }
});

router.get("/:home_id", async (req, res) => {
  const home_id = req.params.home_id;
  try {
    const home = await getResourceById("homes", home_id);
    console.log(home);
    res.status(200).json(home);
  } catch (error) {
    res.status(500).json("internal server error");
  }
});

router.post("/", valHomeFields,async (req, res) => {
  try {
    console.log(req.body)
    const homes = await addResource("homes", req.body);
    res.status(200).json(homes);
  } catch (error) {
    res.status(500).json("oops");
  }
});

module.exports = router;
