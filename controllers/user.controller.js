const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { isAuth, isAdmin, generateToken } = require("../auth/auth.js");
const expressAsyncHandler = require("express-async-handler");

const login = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({ message: "Invalid email or password" });
});

const signup = expressAsyncHandler(async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
  });
  const user = await newUser.save();
  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user),
  });
});

const findAll = async (req, res) => {
  try {
    const usuarios = await User.find();
    return res.json(usuarios);
  } catch (e) {
    return res.json({
      msg: "error",
      details: e.message,
    });
  }
};

module.exports = {
  findAll,
  login,
  signup,
};
