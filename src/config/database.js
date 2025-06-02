const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/gym-plan';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log(`MongoDB Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Erro: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;