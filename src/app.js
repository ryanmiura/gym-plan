const mongoose = require('mongoose');
const connectDB = require('./config/database');
const Logger = require('./utils/logger');

// Importar modelos
require('./models');

// Conectar ao MongoDB
connectDB();

// Tratamento de exceções não capturadas
process.on('uncaughtException', (err) => {
    Logger.error('ERRO NÃO CAPTURADO! 💥 Encerrando...', err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    Logger.error('PROMESSA NÃO TRATADA! 💥 Encerrando...', err);
    process.exit(1);
});

Logger.info('Sistema iniciado com sucesso');