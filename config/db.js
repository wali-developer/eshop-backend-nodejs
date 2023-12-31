const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_CONNECTION_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: "eshop",
    });
    console.log(`Database is connected!!! ${conn.connection.host} `);
  } catch (error) {
    console.error(`Error: ${error} `);
    process.exit(1); //passing 1 - will exit the proccess with error
  }
};

module.exports = connectDB;
