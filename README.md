# Gym Plan - Sistema de Gerenciamento de Fichas de Treino 🏋️‍♂️

Sistema backend para gerenciamento de fichas de treino de academia, permitindo que professores criem e gerenciem treinos personalizados para seus alunos.

## Entidades Principais 📊

- **Professor**: Responsável por criar e gerenciar fichas de treino
- **Aluno**: Recebe e visualiza suas fichas de treino personalizadas
- **Ficha de Treino**: Contém exercícios específicos para cada dia da semana
- **Exercício**: Define detalhes como séries, repetições e grupo muscular

## Principais Funcionalidades 🎯

- Gestão de fichas de treino personalizadas
- Controle de exercícios por dia da semana
- Área específica para professores e alunos
- Sistema de autenticação seguro

## Tecnologias Utilizadas 🚀

- Node.js
- Express
- MongoDB
- Docker
- JWT para autenticação
- bcrypt para criptografia

## Estrutura do Projeto 📁

O projeto segue uma arquitetura MVC com a seguinte estrutura:

- `config/` - Configurações do banco de dados e autenticação
- `models/` - Modelos do MongoDB
- `controllers/` - Lógica de negócios
- `middlewares/` - Middlewares de autenticação e validação
- `routes/` - Rotas da API