const mongoose = require('mongoose');
const Logger = require('../utils/logger');

const MONGODB_URI = 'mongodb://localhost:27017/gym-plan';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        Logger.info(`MongoDB Conectado: ${conn.connection.host}`);

        // Tratamento global de erros do Mongoose
        mongoose.connection.on('error', (err) => {
            Logger.error('Erro no MongoDB:', err);
        });

        mongoose.connection.on('disconnected', () => {
            Logger.warn('MongoDB desconectado. Tentando reconectar...');
            setTimeout(connectDB, 5000); // Tenta reconectar após 5 segundos
        });

        // Configurações adicionais do Mongoose
        mongoose.set('strictQuery', true);
        
    } catch (error) {
        Logger.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;