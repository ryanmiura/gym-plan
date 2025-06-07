const Logger = require('../utils/logger');

class AppError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AppError';
        Error.captureStackTrace(this, this.constructor);
    }
}

const handleError = (error) => {
    // Log do erro
    Logger.error('Erro na aplicação', error);

    // Tratamento de erros específicos do Mongoose
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return new AppError(`Dados inválidos: ${messages.join('. ')}`);
    }

    if (error.code === 11000) {
        const value = error.errmsg.match(/(["'])(\\?.)*?\1/)[0];
        return new AppError(`Valor duplicado: ${value}. Por favor use outro valor`);
    }

    if (error.name === 'CastError') {
        return new AppError(`ID inválido: ${error.value}`);
    }

    return error;
};

module.exports = {
    AppError,
    handleError
};