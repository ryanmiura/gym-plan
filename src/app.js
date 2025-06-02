const mongoose = require('mongoose');
const connectDB = require('./config/database');

// Importar modelos
require('./models');

// Configurar mongoose
mongoose.set('strictQuery', true);

// Conectar ao MongoDB
connectDB();

// Adicionar tratamento básico de erros do MongoDB
mongoose.connection.on('error', (err) => {
    console.error('Erro MongoDB:', err);
});

// Iniciar o servidor básico
const server = require('http').createServer();
const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});