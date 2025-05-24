import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./db/ConnectDB.database.js";
import AuthRoute from "./routes/Auth.routes.js";
import VerifiedRoute from "./routes/Verified.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 4040;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello there this is Home route");
});

app.use("/user", VerifiedRoute);

app.use("/api", AuthRoute)

ConnectDB();

app.listen(PORT, (req, res) => {
    console.log(`Server is Running on Port: ${PORT}`);
})