const express = require("express");
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors"); 
const app = express();
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT;
const routerData = require("./router/route")
require("./db/conn")

app.use(cors());

app.use(express.json());
app.use("/api" , routerData)


app.use("*", (req, res) => {
    return res.status(404).json({msg:"Page not found"});
});

app.listen(PORT , () => {
    console.log(`server is running on port no ${PORT}`);
})
