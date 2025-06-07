const mongoose = require('mongoose');
const validationPlugin = require('./plugins/validationPlugin');

const professorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Nome é obrigatório'],
        trim: true,
        minlength: [3, 'Nome deve ter no mínimo 3 caracteres'],
        maxlength: [100, 'Nome deve ter no máximo 100 caracteres']
    },
    email: {
        type: String,
        required: [true, 'Email é obrigatório'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            'Por favor insira um email válido'
        ]
    },
    senha: {
        type: String,
        required: [true, 'Senha é obrigatória'],
        minlength: [6, 'Senha deve ter no mínimo 6 caracteres'],
        maxlength: [100, 'Senha deve ter no máximo 100 caracteres'],
        validate: {
            validator: function(senha) {
                // Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(senha);
            },
            message: 'Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número'
        }
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    ativo: {
        type: Boolean,
        default: true
    }
});

// Aplicar o plugin de validação
professorSchema.plugin(validationPlugin);

// Método para verificar se o professor está ativo
professorSchema.methods.isAtivo = function() {
    return this.ativo;
};

// Índices
professorSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('Professor', professorSchema);