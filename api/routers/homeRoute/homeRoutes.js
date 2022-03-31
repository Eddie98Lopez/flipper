const express = require("express");
const { restart } = require("nodemon");
const {
  getResources,
  getResourceById,
  addResource,
  updateResource,
  deleteResource
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

router.put('/:home_id',async(req,res)=>{
  const id = req.params.home_id
  try {
    const home = await updateResource('homes',id,req.body)
    res.status(200).json('updated',home)
    
    
  } catch (error) {
    res.status(500).json('request failed')
    
  }

})

router.delete('/home_id', async(req,res)=>{
  const id = req.params.home_id
  try {
    const deleted = await deleteResource('homes',id)
    res.status(200).json('deleted', deleted)
    
  } catch (error) {
    res.status(500).json('resource was NOT deleted')
    
  }
})

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
