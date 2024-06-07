// Importing required modules
const express = require('express');
const router = express.Router();

// Route for handling food data request
router.post('/foodData', (req, res) => {
    try {
        console.log(global.foodItems)
        // Sending foodItems and foodCategory as response
        res.send([global.foodItems, global.foodCategory]);
    } catch (error) {
        console.error(error);
        // Sending error response in case of an error
        res.status(500).json({ message: 'An error occurred' });
    }
});

module.exports = router; // Exporting the router for use in other parts of the application
