const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// create jwt
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1h" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    // create token (headers+ payload+ signature)
    const token = createToken(user._id)

    res.status(200).json({ email, token });

  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    const user = await User.signup(email, password);
    // create token (headers+ payload+ signature)
    const token = createToken(user._id)

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};


const getUsers = async (req, res) => {
  //all -> {}
  //createdAt:-1 -> lastest on top
  const workouts = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};
module.exports = { loginUser, signupUser, getUsers };
