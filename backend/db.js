// Importing mongoose library for MongoDB interaction
const mongoose = require('mongoose');
// MongoDB connection URI
const uri = `mongodb+srv://prakhar1:prakhar123@cluster1.e1gd7en.mongodb.net/goFood?retryWrites=true&w=majority&appName=Cluster1`;

// Function to connect to MongoDB and fetch data
const mongoDB = async () => {
    try {
        // Connecting to MongoDB using the provided URI
        await mongoose.connect(uri);
        console.log("Connected successfully");

        // Fetching data from 'foodItems' collection
        const foodItemsdata = await mongoose.connection.db.collection("foodItems").find({}).toArray();
        // Fetching data from 'foodCategory' collection
        const foodCategorydata = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

        // Storing fetched data in global variables for use in other parts of the application
        global.foodItems = foodItemsdata;
        global.foodCategory = foodCategorydata;

    } catch (err) {
        // Handling errors during MongoDB connection or data fetching
        console.log("---", err);
    }
}

module.exports = mongoDB; // Exporting the mongoDB function for use in other parts of the application
