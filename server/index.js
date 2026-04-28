import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcryptjs";

import User from "./models/User.js";
import auth from "./middleware/auth.js";

// Load env
dotenv.config();

const app = express();

// -------------------- MIDDLEWARE --------------------
app.use(cors()); // Allow all origins for easier debugging
app.use(express.json());

// -------------------- GOOGLE CLIENT --------------------
const client = new OAuth2Client(); // Audience is passed during verification

// -------------------- ROUTES --------------------

// Test
app.get("/", (req, res) => {
  res.send("API is running...");
});


// 🔥 GOOGLE AUTH
app.post("/api/auth/google", async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ message: "Token is required" });
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      console.error("CRITICAL: GOOGLE_CLIENT_ID is missing in server .env");
      return res.status(500).json({ message: "Server configuration error (Missing Client ID)" });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        user.profileImage = picture;
        await user.save();
      }
    } else {
      user = new User({
        username: name,
        email,
        googleId,
        profileImage: picture,
      });
      await user.save();
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Google login successful", token, user });
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(500).json({ message: "Google authentication failed" });
  }
});


// 🔥 REGISTER
app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 🔥 LOGIN
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 🔥 PROFILE
app.get("/api/user/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 🔥 SEARCH USERS (FIXED + IMPORTANT)
app.get("/api/users/search", auth, async (req, res) => {
  try {
    const query = req.query.query || "";

    const users = await User.find({
      username: { $regex: query, $options: "i" },
      _id: { $ne: req.user.userId }
    }).select("username email profileImage");

    res.json(users);
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ message: err.message });
  }
});


// -------------------- DATABASE --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo Error:", err));


// -------------------- SERVER --------------------
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});