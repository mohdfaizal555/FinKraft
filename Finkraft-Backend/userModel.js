const mongoose = require("mongoose");

//Schema is created for required attributes

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    office: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    salary: {
      type: Number,
      required: true
    }
  });
  
  
  const User = mongoose.model('User', UserSchema);

  
module.exports = User;
