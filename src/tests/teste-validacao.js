const mongoose = require('mongoose');
const { Professor } = require('../models');
const connectDB = require('../config/database');
const Logger = require('../utils/logger');

// Função auxiliar para esperar um tempo
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Função para testar a criação de professor com dados válidos
async function testeCriacaoProfessorValido() {
    try {
        const professorValido = new Professor({
            nome: 'João Silva',
            email: 'joao.silva@exemplo.com',
            senha: 'Senha123'
        });

        await professorValido.save();
        Logger.info('Teste de criação de professor válido: PASSOU');
    } catch (error) {
        Logger.error('Teste de criação de professor válido: FALHOU', error);
    }
}

// Função para testar validações de campo obrigatório
async function testeValidacaoCamposObrigatorios() {
    try {
        const professorInvalido = new Professor({
            // Sem campos obrigatórios
        });

        await professorInvalido.save();
        Logger.error('Teste de campos obrigatórios: FALHOU - Deveria ter lançado erro');
    } catch (error) {
        if (error.name === 'ValidationError') {
            Logger.info('Teste de campos obrigatórios: PASSOU');
        } else {
            Logger.error('Teste de campos obrigatórios: FALHOU', error);
        }
    }
}

// Função para testar validação de email
async function testeValidacaoEmail() {
    try {
        const professorEmailInvalido = new Professor({
            nome: 'Maria Santos',
            email: 'email.invalido',
            senha: 'Senha123'
        });

        await professorEmailInvalido.save();
        Logger.error('Teste de validação de email: FALHOU - Deveria ter lançado erro');
    } catch (error) {
        if (error.name === 'ValidationError' && error.errors.email) {
            Logger.info('Teste de validação de email: PASSOU');
        } else {
            Logger.error('Teste de validação de email: FALHOU', error);
        }
    }
}

// Função para testar validação de senha
async function testeValidacaoSenha() {
    try {
        const professorSenhaInvalida = new Professor({
            nome: 'Pedro Costa',
            email: 'pedro.costa@exemplo.com',
            senha: '123' // Senha muito curta e sem caracteres especiais
        });

        await professorSenhaInvalida.save();
        Logger.error('Teste de validação de senha: FALHOU - Deveria ter lançado erro');
    } catch (error) {
        if (error.name === 'ValidationError' && error.errors.senha) {
            Logger.info('Teste de validação de senha: PASSOU');
        } else {
            Logger.error('Teste de validação de senha: FALHOU', error);
        }
    }
}

// Função principal que executa todos os testes
async function executarTestes() {
    try {
        Logger.info('Iniciando testes de validação...');
        
        await connectDB();
        await wait(1000); // Espera a conexão estabilizar

        await testeCriacaoProfessorValido();
        await testeValidacaoCamposObrigatorios();
        await testeValidacaoEmail();
        await testeValidacaoSenha();

        Logger.info('Testes de validação concluídos!');
    } catch (error) {
        Logger.error('Erro ao executar testes:', error);
    } finally {
        await mongoose.connection.close();
        process.exit();
    }
}

// Executa os testes
executarTestes();