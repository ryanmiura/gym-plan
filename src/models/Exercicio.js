const mongoose = require('mongoose');

const exercicioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Nome do exercício é obrigatório']
    },
    grupoMuscular: {
        type: String,
        required: [true, 'Grupo muscular é obrigatório']
    },
    series: {
        type: Number,
        required: [true, 'Número de séries é obrigatório'],
        min: [1, 'Mínimo de 1 série']
    },
    repeticoes: {
        type: Number,
        required: [true, 'Número de repetições é obrigatório'],
        min: [1, 'Mínimo de 1 repetição']
    },
    observacoes: {
        type: String,
        default: ''
    }
});

// Índice para busca por nome de exercício
exercicioSchema.index({ nome: 1 });

// Índice para busca por grupo muscular
exercicioSchema.index({ grupoMuscular: 1 });

module.exports = mongoose.model('Exercicio', exercicioSchema);