const mongoose = require('mongoose');

const exercicioTreinoSchema = new mongoose.Schema({
    exercicioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercicio',
        required: [true, 'Exercício é obrigatório']
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

const fichaTreinoSchema = new mongoose.Schema({
    professorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Professor',
        required: [true, 'Professor é obrigatório']
    },
    alunoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aluno',
        required: [true, 'Aluno é obrigatório']
    },
    dataInicio: {
        type: Date,
        required: [true, 'Data de início é obrigatória']
    },
    dataFim: {
        type: Date,
        required: [true, 'Data de fim é obrigatória']
    },
    segunda: [exercicioTreinoSchema],
    terca: [exercicioTreinoSchema],
    quarta: [exercicioTreinoSchema],
    quinta: [exercicioTreinoSchema],
    sexta: [exercicioTreinoSchema],
    sabado: [exercicioTreinoSchema],
    domingo: [exercicioTreinoSchema]
});

// Índices para melhorar performance das consultas
fichaTreinoSchema.index({ professorId: 1, alunoId: 1 });
fichaTreinoSchema.index({ dataInicio: 1, dataFim: 1 });

// Método para verificar se a ficha está ativa
fichaTreinoSchema.methods.isAtiva = function() {
    const hoje = new Date();
    return hoje >= this.dataInicio && hoje <= this.dataFim;
};

// Middleware para validar datas antes de salvar
fichaTreinoSchema.pre('save', function(next) {
    if (this.dataFim < this.dataInicio) {
        next(new Error('Data de fim não pode ser anterior à data de início'));
    }
    next();
});

module.exports = mongoose.model('FichaTreino', fichaTreinoSchema);