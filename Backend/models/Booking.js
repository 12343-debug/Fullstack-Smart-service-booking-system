const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    serviceTitle: String,
    userName: String,
    Phone: String,

    userId:{
      type:mongoose.Schema.types.objectId,
      ref:'User',
      required:true   
    },

    status: {
      type: String,
      default: "Pending",
    },
    createdAt:{
      type:Date,
      default:Date.now
    },
    
  
  },
    {
    timestamps: true   
  }
  
);

module.exports = mongoose.model("Booking", bookingSchema);
