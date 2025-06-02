const mongoose = require('mongoose');

const professorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Nome é obrigatório']
    },
    email: {
        type: String,
        required: [true, 'Email é obrigatório'],
        unique: true,
        lowercase: true
    },
    senha: {
        type: String,
        required: [true, 'Senha é obrigatória'],
        minlength: 6
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Professor', professorSchema);