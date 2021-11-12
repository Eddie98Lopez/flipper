const bcrypt = require("bcryptjs");
const { getResByFilter } = require("../../models/dbHelpers");

const hashPass = (req, res, next) => {
  const { password } = req.body;
  const hash = bcrypt.hashSync(password, 12);
  req.newUser = { ...req.body, password: hash };
  next();
};

const valRegister = (req, res, next) => {
  const { username, password, email, first_name, last_name } = req.body;
  if (!username || !password || !email || !first_name || !last_name) {
    res.status(400).json({ message: "all fields are required" });
  } else {
    next();
  }
};

const usernameFree = async (req,res,next) => {
    const {username} = req.body
    try{
        const user = await getResByFilter('users', {username:username})
        if (user){
            res.status(400).json({message:"username is not available"})
        }
        else{
            next()
        }
        
    }
    catch(err){
        res.status(500).json({message:'there was an error while checking to see if that username was available'})
    }
}

module.exports = { hashPass, valRegister,usernameFree };
