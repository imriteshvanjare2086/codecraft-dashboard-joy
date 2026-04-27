import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import auth from "./middleware/auth.js";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env properly
dotenv.config({
  path: path.join(__dirname, ".env"),
});

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || "421801607650-3gmqs9da96nfa99akaufqn67kjfjbpo7.apps.googleusercontent.com");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// -------------------- ROUTES --------------------

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 🔥 GOOGLE AUTH API
app.post("/api/auth/google", async (req, res) => {
  try {
    const { credential } = req.body;
    console.log("Received Google Auth request...");
    
    if (!credential) {
      console.log("Error: No credential provided in request body");
      return res.status(400).json({ message: "Token is required" });
    }

    console.log("Verifying token with Google...");
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID || "421801607650-3gmqs9da96nfa99akaufqn67kjfjbpo7.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;
    console.log(`Token verified for: ${email}`);

    let user = await User.findOne({ email });

    if (user) {
      console.log("Existing user found. Updating profile info...");
      if (!user.googleId) {
        user.googleId = googleId;
        user.profileImage = picture;
        await user.save();
      }
    } else {
      console.log("No user found. Creating new account...");
      user = new User({
        username: name,
        email,
        googleId,
        profileImage: picture,
      });
      await user.save();
    }

    console.log("Generating JWT...");
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "ritesh_secret", { expiresIn: "7d" });

    console.log("Google Login successful!");
    res.json({
      message: "Google login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        streak: user.streak || 0,
        problemsSolved: user.problemsSolved || 0,
        platformStats: user.platformStats || { leetcode: 0, codeforces: 0, codechef: 0 },
      },
    });
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(500).json({ message: "Google authentication failed" });
  }
});

// 🔥 REGISTER API
app.post("/api/auth/register", async (req, res) => {
  try {
    console.log("BODY:", req.body);

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

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET || "ritesh_secret", { expiresIn: "7d" });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "ritesh_secret", { expiresIn: "7d" });

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User routes (Protected)
app.get("/api/user/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User search API
app.get("/api/users/search", auth, async (req, res) => {
  try {
    const { q } = req.query;
    console.log(`Search request received for query: "${q}" by User ID: ${req.user.userId}`);
    
    if (!q) return res.json([]);

    // Create a fuzzy regex: "chaitanyamore" -> "chaitanya.*more"
    const searchTerms = q.trim().split(/\s+/).join("|");
    console.log(`Searching with regex pattern: ${searchTerms}`);

    const users = await User.find({
      $and: [
        { _id: { $ne: req.user.userId } }, // Exclude current user
        {
          $or: [
            { username: { $regex: searchTerms, $options: "i" } },
            { email: { $regex: q.trim(), $options: "i" } },
          ],
        },
      ],
    }).select("username email profileImage streak problemsSolved platformStats").limit(10);

    console.log(`Found ${users.length} matching users.`);
    res.json(users);
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ message: err.message });
  }
});

// 🔥 LEADERBOARD API
app.get("/api/leaderboard", auth, async (req, res) => {
  try {
    console.log("Leaderboard request received...");
    const users = await User.find({})
      .select("username profileImage problemsSolved streak platformStats")
      .sort({ problemsSolved: -1 }) // Sort by problems solved descending
      .limit(50); // Get top 50 users

    console.log(`Returning ${users.length} users for leaderboard.`);
    res.json(users);
  } catch (err) {
    console.error("Leaderboard Error:", err);
    res.status(500).json({ message: err.message });
  }
});

// 🔥 GET USER STATS FOR BATTLE ARENA
app.get("/api/user-stats/:username", auth, async (req, res) => {
  try {
    const { username } = req.params;
    console.log(`Fetching battle stats for User: ${username}`);
    
    // Case-insensitive exact match
    const user = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const problems = user.problemsSolved || 0;
    
    res.json({
      username: user.username,
      problemsSolved: problems,
      easy: Math.floor(problems * 0.5),
      medium: Math.floor(problems * 0.3),
      hard: Math.floor(problems * 0.2),
      contestRating: user.platformStats?.leetcodeRating || user.platformStats?.codeforcesRating || 1500,
      streak: user.streak || 0,
      accuracy: 70 + Math.floor(Math.random() * 20)
    });
  } catch (err) {
    console.error("Fetch User Stats Error:", err);
    res.status(500).json({ message: err.message });
  }
});

// 🔥 GET USER BY ID API
app.get("/api/users/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(`Fetching profile for User ID: ${userId}`);
    
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json(user);
  } catch (err) {
    console.error("Fetch User Error:", err);
    res.status(500).json({ message: err.message });
  }
});

// 🔥 GET USER BY USERNAME API (for Battle Arena)
app.get("/api/user-stats/:username", auth, async (req, res) => {
  try {
    const { username } = req.params;
    console.log(`Battle Arena: Fetching stats for username: ${username}`);
    
    // Case-insensitive search for username
    const user = await User.findOne({ 
      username: { $regex: new RegExp("^" + username + "$", "i") } 
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: `User "${username}" not found` });
    }
    
    res.json(user);
  } catch (err) {
    console.error("Fetch User Stats Error:", err);
    res.status(500).json({ message: err.message });
  }
});

// Add friend API (Follow)
app.post("/api/friends/add", auth, async (req, res) => {
  try {
    const { friendId } = req.body;
    if (!friendId) return res.status(400).json({ message: "Friend ID required" });

    const user = await User.findById(req.user.userId);
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Already in friends list" });
    }

    user.friends.push(friendId);
    await user.save();

    // Also add current user to friend's list (Mutual)
    const friend = await User.findById(friendId);
    if (friend && !friend.friends.includes(user._id)) {
      friend.friends.push(user._id);
      await friend.save();
    }

    res.json({ message: "Friend added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update fetch friends route to return full data
app.get("/api/friends", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate("friends", "username email profileImage streak problemsSolved platformStats");
    if (!user) return res.status(404).json({ message: "User not found" });
    
    // Create the list of people for the leaderboard (friends + current user)
    const members = [
      {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        streak: user.streak || 0,
        problemsSolved: user.problemsSolved || 0,
        platformStats: user.platformStats || { leetcode: 0, codeforces: 0, codechef: 0 },
        isMe: true
      },
      ...user.friends.map(f => ({
        _id: f._id,
        username: f.username,
        email: f.email,
        profileImage: f.profileImage,
        streak: f.streak || 0,
        problemsSolved: f.problemsSolved || 0,
        platformStats: f.platformStats || { leetcode: 0, codeforces: 0, codechef: 0 },
        isMe: false
      }))
    ];

    // Sort by problems solved descending
    members.sort((a, b) => b.problemsSolved - a.problemsSolved);

    res.json({ friends: members });
  } catch (err) {
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