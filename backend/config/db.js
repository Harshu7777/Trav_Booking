const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

const dbConncetion = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Database connected successfully');
    } catch (error) {
        console.log('database Connection Error!');
        process.exit(1);
    }
}

module.exports = dbConncetion