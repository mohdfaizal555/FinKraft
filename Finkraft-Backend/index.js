const express = require("express");
const mongoose = require("mongoose");
const User = require("./userModel");
const cors = require("cors");

const app = express();

app.use(cors()); //API will hit on cross browsers also.

app.use(express.json());

//To connect with a Database(MongoDB) .
//All sensitive data like URL,PORT number etc. should be stored in .env file for secure reasons.
mongoose
  .connect("mongodb+srv://mohammad:F$izal7867@usersinfo.czgrd1l.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected"); 
  })
  .catch((err) => {
    console.log(`MongoDB connection error: ${err}`);
  });

//If multiple APIs are there,can use different files and express.router() for modular code and reusablity.

//API to store on Database
app.post("/api/post",async (req, res) => {
  const { name, position, office, age, startDate, salary } = req.body;

  try{
    const newUser = new User({
        name,
        position,
        office,
        age,
        startDate,
        salary,
      });
    const saveItem = await newUser.save()
    res.status(201).json({ msg: "User created Successfully",saveItem });
  }

  catch(err){
    res.status(404).json({err});
  }
});

//API to retrieve on Database
app.get("/api/get", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ msg: "Failed to retrieve users"},err);
    });
});

//PORT NUMBER
app.listen(5000, () => {
  console.log(`Server started on port 5000`);
});
