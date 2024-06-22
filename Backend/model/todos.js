const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
    
  },
  dicription:{
    type:String,
  },
  createAt:{
    type:Date,
    default:Date.now()
  },
  userId:{
    type:String
  }

});

const todoModel = mongoose.model("Todo",todoSchema);

module.exports = todoModel;