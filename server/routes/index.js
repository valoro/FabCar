const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const dbConnector = require('../utils/dbConnector');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index');
});

router.post('/register', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json('This email is already registered, login instead?');
    } else {
      res.json(user);
    }
  });
});

router.post('/authenticate', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.getUserByEmail(email, (err, user) => {
    if (err) {
      return res.status(500).json(err);
    }
    if(!user){      
      return res.status(404).json('There is no user with such an email, Register instead?');
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) {
        res.status(500).json('Password didnt match');
      }
      if (isMatch) {
        const token = jwt.sign(user.toJSON(), dbConnector.secret);
        return res.json({ token: 'JWT ' + token });
      } else {
        return res.json('Wrong password');
      }
    });
  });
});

module.exports = router;
