// require('dotenv').config(); // enable it in your machine with your .env file
const express = require("express");
const app = express();
const connectDB = require('./database'); // connection to db
const User = require('./Schema/User'); // User Schema for login credentials
const RefreshToken = require('./Schema/RefreshTokens'); // Refresh token schema for User 
const bcrypt = require("bcrypt"); // hashing passwords
const jwt = require("jsonwebtoken"); // JWTs
const cors = require("cors"); // Cross-Origin Resource Sharing

app.use(express.json());
app.use(cors());
connectDB();


// Verify JWT access token
const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        // Verify token
        jwt.verify(token, "MysecretKey", (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid!");
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json("You are not authenticated!");
    }
};

// Generate access tokens
const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "MysecretKey", { expiresIn: "10m" });3
};

// Generate refresh tokens
const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");
};

// Login route
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    // Find user in database
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json("Email or password is incorrect");
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json("Email or password is incorrect");
    }


    // Generate access and refresh tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store refresh token in databasee
    await RefreshToken.create({
        userId: user._id,
        refreshToken,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days exo
    });

    res.json({
        email: user.email,
        isAdmin: user.isAdmin,
        accessToken,
        refreshToken,
        password
    });
});

// Refresh token route
app.post("/api/refresh", async (req, res) => {
    const refreshToken = req.body.token;

    if (!refreshToken) return res.status(401).json("You are not authenticated!");

    // Find the refresh token in the database
    const storedToken = await RefreshToken.findOne({ refreshToken });
    if (!storedToken) {
        return res.status(403).json("Refresh token is not valid!");
    }

    // Verify the refresh token
    jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
        if (err) return console.log(err);

        // Remove the used refresh token
        RefreshToken.deleteOne({ refreshToken }).then(() => {
            const newAccessToken = generateAccessToken(user);
            const newRefreshToken = generateRefreshToken(user);

            // Store the new refresh token in the DB
            RefreshToken.create({
                userId: user.id,
                refreshToken: newRefreshToken,
                expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days exp
            });

            // Send new tokens to client
            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            });
        });
    });
});

// Register route
app.post("/api/register", async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        // Check if email already exists in database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword 
        });

        // Save the new user to MongoDB
        await newUser.save();

        // Success message response
        res.status(201).json({
            message: "Account created successfully",
            userId: newUser._id, 
            email: newUser.email,
            firstname: newUser.firstname,
            lastname: newUser.lastname
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Route to log out the user (delete refresh token), need a logout button
app.post("/api/logout", verify, async (req, res) => {
    const refreshToken = req.body.token;

    // Remove the refresh token from the database
    await RefreshToken.deleteOne({ refreshToken });

    res.status(200).json("You logged out successfully.");
});

// Middleware for deleting user (can be used for deleting own account)
app.delete("/api/users/:userId", verify, async (req, res) => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
        await User.deleteOne({ _id: req.params.userId });
        res.status(200).json("User has been deleted.");
    } else {
        res.status(403).json("You are not allowed to delete this user!");
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server started on port 3000");
});