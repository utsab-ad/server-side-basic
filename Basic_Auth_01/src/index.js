import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./db/ConnectDB.database.js";
import AuthRoute from "./routes/Auth.routes.js";

dotenv.config();

const PORT = process.env.PORT || 4040;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello There");
});

app.use("/auth", AuthRoute);

ConnectDB();

app.listen(PORT, (req, res) => {
    console.log(`Server is Running on Port: ${PORT}`);
})