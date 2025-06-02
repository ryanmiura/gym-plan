# 💪 Gym Plan - Sistema de Gerenciamento de Fichas de Treino

## 📋 Descrição
Sistema backend para gerenciamento de fichas de treino de academia, permitindo que professores criem e gerenciem fichas de treino para seus alunos, definindo exercícios específicos para cada dia da semana.

## 🛠️ Tecnologias Utilizadas Atualmente
- **Node.js** - Ambiente de execução
- **MongoDB** - Banco de dados
- **Mongoose** - ODM para MongoDB
- **Docker** - Containerização do MongoDB

## 🔮 Tecnologias a Serem Implementadas
- **Express** - Framework web
- **dotenv** - Gerenciamento de variáveis de ambiente
- **nodemon** - Hot-reload para desenvolvimento
- **JWT** - Autenticação
- **bcrypt** - Criptografia de senhas
- **cors** - Proteção CORS
- **Joi ou Yup** - Validação de dados
- **Jest** - Testes automatizados
- **Swagger** - Documentação da API
- **Winston** - Logging
- **Rate Limiting** - Proteção contra excesso de requisições
- **Compression** - Compressão de respostas HTTP

## 📁 Estrutura Atual do Projeto
```
src/
├── config/
│   └── database.js
├── models/
│   ├── Professor.js
│   ├── Aluno.js
│   ├── Exercicio.js
│   ├── FichaTreino.js
│   └── index.js
├── tests/
│   └── teste-inicial.js
└── app.js
```

## 🎯 Estrutura a Ser Implementada
```
src/
├── config/
│   ├── database.js
│   └── auth.js
├── models/
│   [já implementado]
├── controllers/
│   ├── ProfessorController.js
│   ├── AlunoController.js
│   ├── FichaTreinoController.js
│   └── ExercicioController.js
├── middlewares/
│   ├── auth.js
│   ├── error.js
│   ├── validation.js
│   └── rateLimiter.js
├── routes/
│   ├── professor.routes.js
│   ├── aluno.routes.js
│   ├── fichaTreino.routes.js
│   └── exercicio.routes.js
├── utils/
│   ├── logger.js
│   └── validationSchemas.js
├── tests/
│   ├── unit/
│   └── integration/
└── app.js
```

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js
- Docker
- Docker Compose

### Instalação e Execução

1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd gym-plan
```

2. Instale as dependências
```bash
npm install
```

3. Inicie o MongoDB
```bash
docker-compose up -d
```

4. Execute os testes para verificar se tudo está funcionando
```bash
npm run test
```

5. Execute o projeto
```bash
npm start
```

## 📊 Status do Projeto

### ✅ Implementado
- Configuração do ambiente com Docker
- Conexão com MongoDB
- Modelos de dados (Professor, Aluno, Exercício, Ficha de Treino)
- Testes básicos de funcionalidade

### 🚧 Em Desenvolvimento
- API RESTful com Express
- Sistema de autenticação
- Controllers e rotas
- Validações
- Documentação da API
- Testes automatizados
- Sistema de variáveis de ambiente
- Hot-reload para desenvolvimento