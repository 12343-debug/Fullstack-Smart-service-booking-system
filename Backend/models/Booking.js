const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    serviceTitle: String,
    userName: String,
    Phone: String,

    slot:{
    type:String,
    required:true
  },

    userId:{
      type:mongoose.Schema.Types.ObjectId,
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
  },
  
  
);

module.exports = mongoose.model("Booking", bookingSchema);
