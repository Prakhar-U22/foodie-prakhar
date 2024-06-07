// Importing required modules
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Importing User model from the models directory
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator'); // Validation middleware
const bcrypt = require('bcryptjs'); // For password hashing

const jwtSecret = "Mhbrjahfhdshbkjsbkjakjfb$#"; // Secret key for JWT token

// Route for creating a new user-------------------------------------------------->
router.post("/createUser",
    body('email').isEmail(), // Validate email format
    body('name').isLength({ min: 5 }), // Name must be at least 5 characters long
    body('password', 'Incorrect Password').isLength({ min: 8 }), // Password must be at least 8 characters long
    async (req, res) => {
        const errors = validationResult(req); // Get validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Return validation errors if any
        }

        // Hash the password before storing in the database
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt);

        try {
            // Create a new user in the database
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            });
            return res.json({ success: true, alert: "User successfully created" }); // Success response
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Server Error" }); // Internal server error
        }
    }
);

// Route for user login------------------------------------------------------->
router.post("/loginUser",
    body('email').isEmail(), // Validate email format
    body('password', 'Incorrect Password').isLength({ min: 8 }), // Password must be at least 8 characters long
    async (req, res) => {
        const errors = validationResult(req); // Get validation errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // Return validation errors if any
        }

        try {
            // Find user by email in the database
            let userData = await User.findOne({ email: req.body.email });

            if (!userData) {
                return res.status(400).json({ errors: "Try logging in with correct credentials" }); // User not found
            }

            // Compare hashed password with input password
            const isMatch = await bcrypt.compare(req.body.password, userData.password);
            if (!isMatch) {
                return res.status(400).json({ errors: "Try logging in with correct credentials" }); // Incorrect password
            }

            // Create JWT token for authentication
            const data = {
                user: {
                    id: userData.id
                }
            };
            const authToken = jwt.sign(data, jwtSecret);
            return res.json({ success: true, authToken: authToken }); // Success response with auth token
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "Server Error" }); // Internal server error
        }
    }
);

module.exports = router; // Export the router for use in other parts of the application
