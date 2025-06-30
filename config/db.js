const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    
  
    await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(" MongoDB Connected:");
  } catch (err) {
    console.error(" MongoDB Connection Error:", err);
    console.log("Using URI:");
    process.exit(1);
  }
};

module.exports = connectDB;
