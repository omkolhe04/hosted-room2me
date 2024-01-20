const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require("jsonwebtoken")
const {Jwt_secret} = require('../models/models');
const requireLogin = require('../middlewares/requireLogin');

router.get("/addRoom", requireLogin, (req, res) => {
  console.log('hello auth');
  console.log(req.user);
  res.send("Authenticated!");
});

router.post("/signup", async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    const token = jwt.sign({ _id: result._id }, Jwt_secret);
    res.json({ token, user: result });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


router.post("/login", async (req, res) => {
  try {
    if (req.body.password && req.body.email) {
      let user = await User.findOne(req.body).select("-password");
      if (user) {
        const token = jwt.sign({_id:user.id},Jwt_secret)
        const {_id,name,email}=user

        res.json({token, User:{_id,name,email}})
        
        console.log({token, User:{_id,name,email}})
      } else {
        res.send({ result: 'No user found' });
      }
    } else {
      res.send({ result: 'No user found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
