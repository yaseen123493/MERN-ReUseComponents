import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/user.js";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

/* ROUTES */
app.use("/auth", authRouter);
app.use("/user", userRouter);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

/* Mysql setup*/

//   var mysql = require('mysql');
//   var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Ritwik@mysql",
//     database: 'liferay7'
//   });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// app.get("/data",(request,response)=>{
//   con.query("SELECT * FROM data",(err,result)=>{
//     if (err) throw err;
//     response.send(result);
//   })
// })
