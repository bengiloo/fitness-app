const express = require("express");
const app = express();
const bcrypt = require("bcrypt"); // Not used yet, but will be soon

// json web token library
const jwt = require("jsonwebtoken");

// To Parse json data from incoming requests
app.use(express.json());

// Enables Cross-Origin Resource Sharing since
// client and server are on different ports
const cors = require("cors");
app.use(cors());


// Getting replaced for mongoDB
const users = [
    {
        id: "1",
        email: "jonny@gmail.com",
        password: "superRandomPassword",
        firstname: "John",
        lastname: "Doe",
        isAdmin: false
    },
    {
        id: "2",
        email: "jessica@gmail.com",
        password: "totallyNotABadPassword",
        firstname: "Jess",
        lastname: "Doe",
        isAdmin: false
    }
];

// store refresh token in db
// for now im sotring them here
let refreshTokens = []

// Refresh token requests
app.post("/api/refresh", (req, res) => {
    // Get refresh token from request body
    const refreshToken = req.body.token;

    // Check to see if token is missing or invalid
    if (!refreshToken) return res.status(401).json("You are not authenticated!");
    if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token is not valid!");
    }

    // Verify refresh token (myRefreshSecretKey is temporary)
    // TODO: generate a secretkey and hash with bcrypt, then replace temporary key
    jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
        err && console.log(err);
        
        // Remove the used refresh tokekn to generate new tokens
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken); // Needs to be modified for the database instead
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);

        // Store tokekn
        refreshTokens.push(newRefreshToken); // once db is up, store in db instead

        // send token back to client
        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    });
});

//TODO: Generate proper keys for these functions (currently the keys are basic)
const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin },
        "MysecretKey",
        { expiresIn: "10m" });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, isAdmin: user.isAdmin },
        "myRefreshSecretKey");
};

// Route for login requests
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    // Find user in the list (replace with db once schema is set up)
    const user = users.find(u => {
        return u.email === email && u.password === password;
    });

    if (user) {
        if (user) {
            // Generate access token
            const accessToken = generateAccessToken(user);
            const refreshToken = generateRefreshToken(user);
            refreshTokens.push(refreshToken);
            
            // Send tokens and user info back to client
            res.json({
                email: user.email,
                isAdmin: user.isAdmin,
                accessToken,
                refreshToken
            });
        } else {
            // If login fails
            res.status(400).json("email or password is incorrect");
        }
    }
});

// Middleware verifies access token during requests
const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        // Verify token
        jwt.verify(token, "MysecretKey", (err, user) => {
            if (err) {
                return res.status(403).json("Token is not valid!");
            }

            // set user info to request object
            req.user = user;
            next();
        });
    } else {
        // If no token is provided then they are not authenticated
        res.status(401).json("You are not authenticated!");
    }
};

// Middleware for deleting user (can be used for deleting own account)
app.delete("/api/users/:userId", verify, (req, res) => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
        res.status(200).json("User has been deleted.");
    } else {
        res.status(403).json("You are not allowed to delete this user!");
    }
});

// Route for logging user out and removing refresh token
app.post("/api/logout", verify, (req, res) => {
    const refreshToken = req.body.token;

    // Remove the token from the list (should be removed from the db)
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("You logged out successfully.");
});

// Register
app.post("/api/register", async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    // Check if email already exists (this is for a list, change the code for mongodb)
    const existingUser = users.find((user) => user.email === email);
    if(existingUser) {
        return res.status(400).json("email already exists");
    }

    try {
        // Hash the password with bcrypt
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user (keep an eye on this)
        const newUser = {
            id: (users.length + 1).toString(), // New user id
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname
        };

        // Push new user to the list, (should be a db eventually)
        users.push(newUser);

        // Success message:
        res.status(201).json({
            message: "Account created successfully",
            userId: newUser.id,
            email: newUser.email,
            firstname: newUser.firstname,
            lastname: newUser.lastname
        });
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal server error");
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log("Server started on port 3000");
});

