
const valHomeFields = (req,res, next) => {
    const{nickname, address,city, postal_code} = req.body

    if (!nickname || !address || !city || !postal_code){
        res.status(400).json({message:'all fields required'})
    }
    else{
        next()
    }

}


module.exports = { valHomeFields}