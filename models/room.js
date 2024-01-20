const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const RoomSchema = new mongoose.Schema({
  roomType: String,
  roomFloor: String,
  numberOfRooms: String,
  numberOfKitchens: String,
  toiletAndBathroom: String,
  electricityBills: String,
  colony: String,
  area: String,
  landmark: String,
  city: String,
  expectedRent: String,
  images: {
    type: [String],
    required: true,
  },
  wishlist:[{type:ObjectId,ref:"users"}],
  postedBy:{
    type:ObjectId,
    ref:"users"
  }
});

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
