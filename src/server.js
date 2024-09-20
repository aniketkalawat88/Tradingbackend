const express = require("express");
const app = express();
const PORT = 8000;
const routerData = require("./router/route")

require("./db/conn")
app.use(express.json());

app.use("/api" , routerData)


app.listen(PORT , () => {
    console.log(`server is running on port no ${PORT}`)
})
