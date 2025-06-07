const mongoose = require('mongoose');
const { Professor, Aluno, Exercicio, FichaTreino } = require('../models');
const connectDB = require('../config/database');
const Logger = require('../utils/logger');
const { AppError } = require('../middleware/errorHandler');

async function testarModelos() {
    try {
        // Conectar ao MongoDB
        await connectDB();
        Logger.info('Conectado ao MongoDB com sucesso');

        // Limpar coleções antes dos testes
        await Promise.all([
            Professor.deleteMany({}),
            Aluno.deleteMany({}),
            Exercicio.deleteMany({}),
            FichaTreino.deleteMany({})
        ]);
        Logger.info('Coleções limpas com sucesso');

        // Criar um professor com dados válidos
        const professor = await Professor.create({
            nome: 'João Silva Santos',
            email: 'joao.silva@academia.com',
            senha: 'Senha123@' // Atende aos critérios: maiúscula, minúscula, número
        });
        Logger.info('Professor criado com sucesso:', { professorId: professor._id });

        // Validar professor criado
        const validacaoProf = await professor.validateField('senha');
        if (validacaoProf.valid) {
            Logger.info('Validação do professor passou com sucesso');
        }

        // Criar um aluno com dados válidos
        const aluno = await Aluno.create({
            nome: 'Maria Oliveira Santos',
            email: 'maria.oliveira@aluno.com',
            senha: 'Aluno123@',
            professorId: professor._id,
            dataNascimento: new Date('1990-01-01'),
            telefone: '(11) 98765-4321'
        });
        Logger.info('Aluno criado com sucesso:', { alunoId: aluno._id });

        // Criar exercícios com validações
        const exercicios = await Exercicio.insertMany([
            {
                nome: 'Supino Reto com Barra',
                grupoMuscular: 'Peitoral',
                series: 4,
                repeticoes: 12,
                observacoes: 'Manter cotovelos alinhados com os ombros',
                nivel: 'Intermediário',
                equipamento: 'Barra e anilhas'
            },
            {
                nome: 'Agachamento Livre',
                grupoMuscular: 'Perna',
                series: 4,
                repeticoes: 10,
                observacoes: 'Manter a coluna neutra e descer até paralelo',
                nivel: 'Avançado',
                equipamento: 'Rack e barra'
            }
        ]);
        Logger.info('Exercícios criados com sucesso:', { 
            count: exercicios.length, 
            ids: exercicios.map(ex => ex._id) 
        });

        // Criar uma ficha de treino completa
        const fichaTreino = await FichaTreino.create({
            professorId: professor._id,
            alunoId: aluno._id,
            dataInicio: new Date(),
            dataFim: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 dias
            objetivo: 'Hipertrofia e condicionamento',
            nivel: 'Intermediário',
            observacoesGerais: 'Descanso de 60 segundos entre séries',
            segunda: [
                {
                    exercicioId: exercicios[0]._id,
                    series: 4,
                    repeticoes: 12,
                    carga: 60,
                    observacoes: 'Aumentar carga gradualmente mantendo a técnica'
                }
            ],
            terca: [
                {
                    exercicioId: exercicios[1]._id,
                    series: 4,
                    repeticoes: 10,
                    carga: 80,
                    observacoes: 'Foco na profundidade e postura'
                }
            ]
        });
        Logger.info('Ficha de treino criada com sucesso:', { fichaId: fichaTreino._id });

        // Buscar ficha de treino com populate completo
        const fichaCompleta = await FichaTreino.findById(fichaTreino._id)
            .populate('professorId', 'nome email')
            .populate('alunoId', 'nome email')
            .populate('segunda.exercicioId', 'nome grupoMuscular nivel')
            .populate('terca.exercicioId', 'nome grupoMuscular nivel');
        
        Logger.info('Busca de ficha completa realizada com sucesso');
        
        // Exibir resultados formatados
        console.log('\nResultados dos testes:');
        console.log('====================');
        console.log('Professor:', {
            nome: fichaCompleta.professorId.nome,
            email: fichaCompleta.professorId.email
        });
        console.log('Aluno:', {
            nome: fichaCompleta.alunoId.nome,
            email: fichaCompleta.alunoId.email
        });
        console.log('Exercícios Segunda:', fichaCompleta.segunda);
        console.log('Exercícios Terça:', fichaCompleta.terca);

    } catch (error) {
        if (error instanceof AppError) {
            Logger.error('Erro de aplicação:', error);
        } else if (error.name === 'ValidationError') {
            Logger.error('Erro de validação:', error);
        } else {
            Logger.error('Erro não esperado:', error);
        }
    } finally {
        // Fechar conexão
        await mongoose.connection.close();
        Logger.info('Conexão com o MongoDB fechada');
    }
}

// Executar testes
Logger.info('Iniciando testes do sistema');
testarModelos();