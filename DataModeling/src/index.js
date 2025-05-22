import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4040;

const app = express();

app.get("/", (req, res) => {
    res.send("<H1>Index Page</H1>");
});
console.log(process.env.PORT);
console.log(PORT)

app.listen(PORT, (req, res) => {
    console.log(`Server is running on Port: ${PORT}`);
});