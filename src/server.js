const express = require("express");
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors"); 
const app = express();
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT;
const routerData = require("./router/route")
require("./db/conn")

app.use(cors({
    origin: (origin, callback) => {
      if (process.env.FRONTEND_URLS.split(',').includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  }));

app.use(express.json());
app.use("/api" , routerData)

app.listen(PORT , () => {
    console.log(`server is running on port no ${PORT}`);
})
