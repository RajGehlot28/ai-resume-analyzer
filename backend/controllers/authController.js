import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // checking if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if(existingUser) {
      return res.status(400).json({ message: "Username or Email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    await User.create({ 
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({ success: true, message: "User registered!" });
  } catch(error) {
    res.status(500).json({ message: "Server error during registration" });
  }
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if(user && await bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, username: user.username });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};