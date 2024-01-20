const jwt = require('jsonwebtoken');
const { Jwt_secret } = require('../models/models');
const mongoose = require('mongoose');
const User = mongoose.model("users");

module.exports = (req, res, next) => {
    console.log('hello middlewares');
    const { authorization } = req.headers;
    
    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in 1" });
    }
    
    const token = authorization.replace("Bearer ", "");
    
    jwt.verify(token, Jwt_secret, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must be logged in 2" });
        }
        
        const { _id } = payload;
        
        User.findById(_id).then(userData => {
            req.user = userData;  // Corrected from req.users to req.user
            next();
        });
    });
};
