// Importing mongoose library to interact with MongoDB
const mongoose = require('mongoose')

// Destructuring Schema from mongoose for creating a new schema
const { Schema } = mongoose;

// Defining the User schema with fields: name, email, password, and location
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

// Exporting the User model based on UserSchema for use in other parts of the application
module.exports = mongoose.model('user', UserSchema)
