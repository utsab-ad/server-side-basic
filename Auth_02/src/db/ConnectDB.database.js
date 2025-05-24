import mongoose from "mongoose";

const ConnectDB = async (req, res) => {
  try {
    mongoose
      .connect(process.env.MONGO_URL, { dbName: "data-base" })
      .then(() => console.log("Database Connected"));
  } catch (error) {

    res.status(500).json({
        success: false,
        message: "Warn: Database Error",
        error
    })

  }
};

export default ConnectDB;