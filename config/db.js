const mongoose = require('mongoose');

exports.config = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  
  mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'));
};