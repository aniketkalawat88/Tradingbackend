const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors"); 
const app = express();
const cookieParser = require("cookie-parser");

dotenv.config()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const PORT = process.env.PORT;
const routerData = require("./router/route")
require("./db/conn")


// app.use(cors({
//     origin: process.env.FRONTEND_URLS,
//     credentials: true,
// }));
const corsOptions = {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
  
      if (frontendUrls.includes(origin)) {
        // Origin is allowed
        callback(null, true);
      } else {
        // Origin is not allowed
        callback(new Error("CORS policy violation: Origin not allowed"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies and authorization headers
  };

app.use(cors(corsOptions));



app.use(cookieParser());
app.use("/api" , routerData)

app.use("*", (req, res) => {
    return res.status(404).json({msg:"Page not found"});
});

app.listen(PORT , () => {
    console.log(`server is running on port no ${PORT}`);
})
