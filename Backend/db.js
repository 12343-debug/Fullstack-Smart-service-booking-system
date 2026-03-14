const mongoose = require('mongoose');
const connectDB = async()=>{ //it connects database
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("mongoDb connected");
    } catch (error) {
        console.log("DB error",error);
        
    }
};
module.exports = connectDB;
