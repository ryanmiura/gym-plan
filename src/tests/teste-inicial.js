const mongoose = require('mongoose');
const { Professor, Aluno, Exercicio, FichaTreino } = require('../models');
const connectDB = require('../config/database');

async function testarModelos() {
    try {
        // Conectar ao MongoDB
        await connectDB();
        console.log('Conectado ao MongoDB');

        // Limpar coleções antes dos testes
        await Promise.all([
            Professor.deleteMany({}),
            Aluno.deleteMany({}),
            Exercicio.deleteMany({}),
            FichaTreino.deleteMany({})
        ]);
        console.log('Coleções limpas');

        // Criar um professor
        const professor = await Professor.create({
            nome: 'João Silva',
            email: 'joao.silva@email.com',
            senha: '123456'
        });
        console.log('Professor criado:', professor);

        // Criar um aluno
        const aluno = await Aluno.create({
            nome: 'Maria Oliveira',
            email: 'maria.oliveira@email.com',
            senha: '123456',
            professorId: professor._id
        });
        console.log('Aluno criado:', aluno);

        // Criar exercícios
        const exercicios = await Exercicio.insertMany([
            {
                nome: 'Supino Reto',
                grupoMuscular: 'Peitoral',
                series: 4,
                repeticoes: 12,
                observacoes: 'Manter cotovelos alinhados'
            },
            {
                nome: 'Agachamento',
                grupoMuscular: 'Perna',
                series: 4,
                repeticoes: 10,
                observacoes: 'Manter coluna reta'
            }
        ]);
        console.log('Exercícios criados:', exercicios);

        // Criar uma ficha de treino
        const fichaTreino = await FichaTreino.create({
            professorId: professor._id,
            alunoId: aluno._id,
            dataInicio: new Date(),
            dataFim: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
            segunda: [
                {
                    exercicioId: exercicios[0]._id,
                    series: 4,
                    repeticoes: 12,
                    observacoes: 'Aumentar carga gradualmente'
                }
            ],
            terca: [
                {
                    exercicioId: exercicios[1]._id,
                    series: 4,
                    repeticoes: 10,
                    observacoes: 'Foco na execução'
                }
            ]
        });
        console.log('Ficha de treino criada:', fichaTreino);

        // Buscar ficha de treino com populate
        const fichaCompleta = await FichaTreino.findById(fichaTreino._id)
            .populate('professorId', 'nome email')
            .populate('alunoId', 'nome email')
            .populate('segunda.exercicioId', 'nome grupoMuscular')
            .populate('terca.exercicioId', 'nome grupoMuscular');
        
        console.log('\nFicha completa:', JSON.stringify(fichaCompleta, null, 2));

    } catch (error) {
        console.error('Erro:', error);
    } finally {
        // Fechar conexão
        await mongoose.connection.close();
        console.log('Conexão fechada');
    }
}

testarModelos();