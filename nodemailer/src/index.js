import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import AuthRoute from "./routes/Auth.routes.js";
import ConnectDB from "./db/ConnectDB.database.js";

dotenv.config();

const PORT = process.env.PORT || 4040;

const app = express();

app.use(express.json());
app.use(cookieParser());

ConnectDB();

app.get("/", (req, res) => {
    res.send("Hello from home route of backend");
});

app.use("/api", AuthRoute);

app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT: ${PORT}`);
})