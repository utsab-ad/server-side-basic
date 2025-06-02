import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ConnectDB from "./db/ConnectDB.db.js";
import AuthRoute from "./routes/Auth.routes.js";
import { requireAuth } from "./middlewares/requireAuth.js";
import ProtectedRoute from "./routes/Protected.routes.js";

dotenv.config();

const PORT = process.env.PORT || 6060;

await ConnectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Home Route");
});

app.use("/port", ProtectedRoute);

app.use("/auth", AuthRoute);

app.listen(PORT, (req, res) => {
    console.log(`The server is running on PORT: ${PORT}`);
})

