const express = require('express')
const router = express.Router()
/*
//middleware for validation
//helper functions to interact with database

homeShape = {
    nickname: '',
    address: '' ,
    status: '',
    author_id: number,
    description: '',
    notes: ''
}




endpoints => method:
"/" => get, post
"/:id" => get, put, delete

*/

router.get('/', async (req,res)=>{
    try{
        res.status(200).json('boop')
    }catch(error){
        res.status(500).json('oops')
    }
})

module.exports = router