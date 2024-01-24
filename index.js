const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const port = process.env.port || 5000;
const path = require("path")

// mongoose.connect('mongodb://127.0.0.1:27017/e-comm')
mongoose.connect("mongodb+srv://omkolhe12:sangita12@room2me.fffzgcd.mongodb.net/?retryWrites=true&w=majority");
<<<<<<< HEAD
// mongoose.connect('mongodb+srv://omkolhe12:sangita@12@cluster0.mongodb.net/room2me', { useNewUrlParser: true, useUnifiedTopology: true });
=======

>>>>>>> 93cac9f (first responsive)

const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json({limit:'10mb'}));
// app.use(express.json());
app.use(cors());

app.use('/', authRoutes); // Use /auth prefix for authentication routes
app.use('/', roomRoutes); // Use /room prefix for room-related routes
app.use('/', userRoutes); // Use /room prefix for room-related routes

app.use(express.static(path.join(__dirname, "./front-end/build")))

app.get("*", (req,res)=>{
    res.sendFile(
        path.join(__dirname,"./front-end/build/index.html"),
        function(err){
            res.status(500).send(err)
        }
    )
})

app.listen(port);
