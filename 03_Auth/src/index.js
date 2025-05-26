import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./db/ConnectDB.database.js";
import AuthRoute from "./routes/Auth.routes.js";
import VerifiedRoute from "./routes/Verified.routes.js";
import cookieParser from "cookie-parser";
import OtpRoute from "./routes/Otp.routes.js";

dotenv.config();

const PORT = process.env.PORT || 4040;

const app = express();

await ConnectDB();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello there this is Home route");
});

app.use("/user", VerifiedRoute);

app.use("/otp", OtpRoute);

app.use("/api", AuthRoute)


app.listen(PORT, (req, res) => {
    console.log(`Server is Running on Port: ${PORT}`);
})