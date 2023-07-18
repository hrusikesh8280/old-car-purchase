const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/User")


userRouter.post('/register', async (req, res) => {
  const { name,email, password,date } = req.body;

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  try {
    const hashedPassword = await bcrypt.hash(password,5);

    const newUser = new UserModel({
        name,
        date,
        email,
        password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send({ msg: 'Registration has been done', newUser });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userId: user._id }, 'NEM-1');
          res.status(200).json({ msg: 'Login successful!', token });
        } else {
          res.status(400).json({ msg: 'Wrong credentials' });
        }
      });
    } else {
      res.status(400).json({ msg: 'No such user exists' });
    }
  } catch (error) {
    res.status(400).json({ msg: 'Wrong credentials' });
  }
});

module.exports = userRouter;
