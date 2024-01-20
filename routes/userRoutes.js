const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Room = mongoose.model("Room");
const User = mongoose.model("users");
const requireLogin = require('../middlewares/requireLogin');

router.get("/user/:id", async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const myroom = await Room.find({ postedBy: req.params.id })
            .populate("postedBy", "_id");

        res.status(200).json({ user, myroom });
    } catch (err) {
        console.error('Error fetching user and rooms:', err);
        return res.status(422).json({ error: err.message });
    }
});

module.exports = router;
