const router = require('express').Router()
const {getResources, getResourceById} = require('../../models/dbHelpers')

router.get('/', async (req,res)=>{
    try {
        const users = await getResources("users");
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ ...error });
      }
})

router.get('/:id', async (req,res)=>{
    const id = req.params.id
    try {
        const users = await getResourceById("users",id);
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ ...error });
      }

})


module.exports = router