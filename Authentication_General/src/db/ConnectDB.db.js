import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL, { dbName: "data-base" })
      .then(() => {
        console.log("Database Connected !");
      });
  } catch (error) {
     console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // stop the app if DB fails
  }
};

export default ConnectDB;
