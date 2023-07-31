const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const router = require("./routes/index");


const corsOptions = {
  origin: ["http://localhost:3005"],
  origin: true,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname,"/uploads")));
app.use("/test", (req, res) => {
  res.send("Hello world!");
});




// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}


app.use(router)


// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
