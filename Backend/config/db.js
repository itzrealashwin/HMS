// const mongoose = require("mongoose");

// const connectDb = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {});
//     console.log(`MongoDb connected : ${conn.connection.host}`);
//   } catch (error) {
//     console.log(`Error : ${error.message}`);
//     process.exit();
//   }
// };

// module.exports = connectDb;

// config/db.js

// config/db.js

// index.js

// config/db.js
const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
