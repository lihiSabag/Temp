const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const trainingSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true
    },
    startTime:{
      type:Date,
      required: true

    },
    duration: {
      type: Number,
      required: true
    },
    typeOfTraining: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
});    

module.exports = mongoose.model("Training", trainingSchema);