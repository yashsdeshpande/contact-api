import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { config } from "dotenv";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  console.log("printing the data = ", req.body);

  if (name == "" || email == "" || password == "")
    return res.json({ message: "All feilds are required" });

  let user = await User.findOne({ email });

  if (user) return res.json({ message: "User Already exist", success: true });

  const hashPassword = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashPassword });

  res.json({ message: "User created successfully", success: true, user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (email == "" || password == "")
    return res.json({ message: "All feilds are required" });

  const user = await User.findOne({ email });

  if (!user) return res.json({ message: "User not exist", success: false });

  const validPass = await bcrypt.compare(password, user.password);

  if (!validPass)
    return res.status(400).json({ message: "Invalid password", success: false });

    const token = jwt.sign({ userId: user._id }, process.env.JWT ,{expiresIn:"1d"})
    
    res.json({ message: `Welcome ${user.name}`,token, success: true });
}