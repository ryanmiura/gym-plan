const Logger = require('../../utils/logger');

const validationPlugin = (schema) => {
    // Middleware pre-save para validação e log
    schema.pre('save', function(next) {
        try {
            // Log de informação antes de salvar
            Logger.info(`Tentando salvar documento ${this.constructor.modelName}`);
            next();
        } catch (error) {
            Logger.error(`Erro ao salvar ${this.constructor.modelName}:`, error);
            next(error);
        }
    });

    // Middleware post-save para log de sucesso
    schema.post('save', function(doc) {
        Logger.info(`Documento ${doc.constructor.modelName} salvo com sucesso. ID: ${doc._id}`);
    });

    // Middleware para tratamento de erros de validação
    schema.post('save', function(error, doc, next) {
        if (error.name === 'ValidationError') {
            Logger.error(`Erro de validação em ${doc.constructor.modelName}:`, error);
            next(new Error(`Erro de validação: ${Object.values(error.errors).map(e => e.message).join(', ')}`));
        } else {
            next(error);
        }
    });

    // Middleware para operações de atualização
    schema.pre('findOneAndUpdate', function(next) {
        const modelName = this.model.modelName;
        Logger.info(`Tentando atualizar documento ${modelName}`);
        
        // Executa validadores
        this.setOptions({ runValidators: true });
        next();
    });

    // Middleware para operações de remoção
    schema.pre('remove', function(next) {
        Logger.info(`Tentando remover documento ${this.constructor.modelName}`);
        next();
    });

    // Adiciona método para validação personalizada
    schema.methods.validateField = async function(fieldName) {
        try {
            await this.validate([fieldName]);
            return { valid: true };
        } catch (error) {
            if (error.errors && error.errors[fieldName]) {
                Logger.error(`Erro de validação no campo ${fieldName}:`, error.errors[fieldName]);
                return {
                    valid: false,
                    message: error.errors[fieldName].message
                };
            }
            return { valid: true };
        }
    };
};

module.exports = validationPlugin;