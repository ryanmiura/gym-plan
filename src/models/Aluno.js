const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
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
    professorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professor',
        required: [true, 'Professor é obrigatório']
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Aluno', alunoSchema);