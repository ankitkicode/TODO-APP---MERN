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

});

const todoModel = mongoose.model("Todo",todoSchema);

module.exports = todoModel;