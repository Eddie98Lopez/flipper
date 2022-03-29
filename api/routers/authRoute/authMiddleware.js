const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getResByFilter } = require("../../models/dbHelpers");

/* For registration the function below jumbles and encrypts the user's 
password so the true password is not visible on the database*/
const hashPass = (req, res, next) => {
  const { password } = req.body;
  const hash = bcrypt.hashSync(password, 12);
  req.newUser = { ...req.body, password: hash };
  next();
};

/* The function below validates that all required fields are filled out*/
const valRegister = (req, res, next) => {
  const { username, password, email, first_name, last_name } = req.body;
  if (!username || !password || !email || !first_name || !last_name) {
    res.status(400).json({ message: "all fields are required" });
  } else {
    next();
  }
};

/* The function below checks to see if a user with the given username already exists.
If the user does exist it returns with an error message*/
const usernameFree = async (req, res, next) => {
  const { username } = req.body;
  try {
    const user = await getResByFilter("users", { username: username });
    if (user.length >= 1) {
      res.status(400).json({ message: "username is not available" });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).send({
      message:
        "there was an error while checking to see if that username was available",
    });
  }
};

const valLogin = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({ message: "all fields required" });
  } else {
    next();
  }
};

const checkUserExist = async (req, res, next) => {
  try {
    const user = await getResByFilter("users", { username: req.body.username });
    if (user.length === 0) {
      res.status(400).send({ message: "Invalid username or password" });
    } else {
      req.user = user[0];
      next();
    }
  } catch (err) {
    res.status(500).send({message:"check user exists error"});
  }
};

const checkPass = (req, res, next) => {
  const hash = req.user.password;
  const { password } = req.body;
  if (bcrypt.compareSync(password, hash) === true) {
    req.passCheck = true;
    next();
  } else {
    res.status(403).send({message:'Invalid username or password'})
   
  }
};

const generateToken = (user, secret) => {
  const payload = {
    subject: user.user_id,
    username: user.username,
  };
  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
};

module.exports = {
  hashPass,
  valRegister,
  usernameFree,
  checkUserExist,
  checkPass,
  valLogin,
  generateToken,
};
