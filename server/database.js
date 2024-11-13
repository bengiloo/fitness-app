const mongoose = require('mongoose');
require('dotenv').config(); // To connect to db, Create a .env file with the mongodb uri

const connectDB = async () => {
    mongoose.connect(process.env.MONGODB_URI) // or you can hardcode that here
        .then(() => console.log('Connected to MongoDB'))
        .catch((error) => console.error('Could not connect to MongoDB:', error));
};

module.exports = connectDB;