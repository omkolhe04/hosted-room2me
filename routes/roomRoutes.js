const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const requireLogin = require('../middlewares/requireLogin');

router.get("/allrooms",  async (req, res) => {
    try {
        const rooms = await Room.find().populate('postedBy', '_id name email');
        res.json(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/addRoom', requireLogin, async (req, res) => {
    try {
        console.log('Authenticated User:', req.user);
        const newRoom = new Room(req.body);
        newRoom.postedBy = req.user._id;
        await newRoom.save();

        res.json({ success: true, message: 'Room added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.get("/myrooms", requireLogin,(req,res)=>{
    Room.find({postedBy:req.user._id})
    .populate("postedBy","_id name email")
    .then(myrooms=>{
        res.json(myrooms)
    })
})

router.put("/wish", requireLogin, async (req, res) => {
    try {
        const result = await Room.findByIdAndUpdate(
            req.body.roomId,
            { $push: { wishlist: req.user._id } },
            { new: true }
        ).populate("postedBy", "_id name email")
        .exec();

        res.json(result);
    } catch (error) {
        return res.status(422).json({ error });
    }
});

router.put("/unwish", requireLogin, async (req, res) => {
    try {
        const result = await Room.findByIdAndUpdate(
            req.body.roomId,
            { $pull: { wishlist: req.user._id } },
            { new: true }
        ).populate("postedBy", "_id name email")
        .exec();

        res.json(result);
    } catch (error) {
        return res.status(422).json({ error });
    }
});

router.get("/wishlist", requireLogin, async (req, res) => {
    try {
        const userWishlist = await Room.find({ wishlist: req.user._id })
            .populate("postedBy", "_id name email")
            .exec();

        res.json(userWishlist);
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.delete("/deleteRoom/:roomId", requireLogin, async (req, res) => {
    try {
        const room = await Room.findOne({ _id: req.params.roomId })
            .populate("postedBy", "_id")
            .exec();

        if (!room) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }

        await Room.deleteOne({ _id: req.params.roomId });
        return res.json({ success: true, message: 'Successfully deleted the room' });
    } catch (error) {
        console.error('Error finding/deleting room:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});



module.exports = router;