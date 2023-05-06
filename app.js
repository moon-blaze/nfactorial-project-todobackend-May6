const express = require("express");
const app = express();
require("dotenv").config();
require("./src/config/databaseConnection")
const port = process.env.port;
const todoRouter = require("./src/routers/todoRouter")


app.use(express.json())

app.use("/api", todoRouter)

app.get("/", (req, res) => {
    res.send("hi...")
})

app.listen(port, () => {
    console.log(`Server ${port} is working`);
})