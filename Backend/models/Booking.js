const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    serviceTitle: String,
    userName: String,
    Phone: String,
    location: {
      address: {
        type: String,
        default: "",
        trim: true,
      },
      notes: {
        type: String,
        default: "",
        trim: true,
      },
      latitude: {
        type: Number,
        default: null,
      },
      longitude: {
        type: Number,
        default: null,
      },
    },

    slot:{
    type:String,
    required:true
  },
    bookingDate: {
      type: String,
      required: true,
      trim: true,
    },

    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
      required:true   
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "in_progress", "completed", "cancelled"],
      default: "pending",
    },
    rescheduledFrom: {
      type: String,
      default: "",
    },
    rescheduleReason: {
      type: String,
      default: "",
    },
    cancelReason: {
      type: String,
      default: "",
    },
    cancelledBy: {
      type: String,
      enum: ["user", "admin", ""],
      default: "",
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
