import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import bodyParser from "express";
import userRouter from './Routes/user.js'
import contactRouter from './Routes/contact.js'

const app = express();

app.use(bodyParser.json());

config({ path: ".env" });

app.use("/api/user", userRouter);

app.use('/api/contact', contactRouter)

app.get("/", (req, res) => {
  res.json({ message: "home page" });
});

//user routes

mongoose
  .connect(process.env.URI, { dbName: "cluster0" })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on port ${port}`));
