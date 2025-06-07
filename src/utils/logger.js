const fs = require('fs');
const path = require('path');

// Criar diretório de logs se não existir
const logDir = path.join(__dirname, '..', '..', 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logPath = path.join(logDir, 'app.log');

class Logger {
    static log(level, message, error = null) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            message,
            error: error ? {
                name: error.name,
                message: error.message,
                stack: error.stack
            } : null
        };

        const logLine = JSON.stringify(logEntry) + '\n';
        fs.appendFileSync(logPath, logLine);

        // Também exibe no console para desenvolvimento
        console.log(`[${timestamp}] ${level}: ${message}`);
        if (error) {
            console.error(error);
        }
    }

    static error(message, error = null) {
        this.log('ERROR', message, error);
    }

    static info(message) {
        this.log('INFO', message);
    }

    static warn(message) {
        this.log('WARN', message);
    }
}

module.exports = Logger;