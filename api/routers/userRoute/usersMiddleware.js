const bcrypt = require('bcryptjs')

const hashPass =  (req,res,next) =>{
    const { password } = req.body;
    const hash = bcrypt.hashSync(password, 12);
    req.newUser = { ...req.body, password: hash };
    next()
}

module.exports ={hashPass}