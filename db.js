const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(() => {
    console.log("Connected to MongoDB!");
  }).catch((err) => {
    console.log('Error: Connection failed... ' + err);
  });
}

module.exports = connectDB;