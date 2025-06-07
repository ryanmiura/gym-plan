# 💪 Gym Plan - Sistema de Gerenciamento de Fichas de Treino

## 📋 Descrição
Sistema backend para gerenciamento de fichas de treino de academia, permitindo que professores criem e gerenciem fichas de treino para seus alunos, definindo exercícios específicos para cada dia da semana.

## 🛠️ Tecnologias Utilizadas
- **Node.js** - Ambiente de execução
- **MongoDB** - Banco de dados
- **Mongoose** - ODM para MongoDB
- **Docker** - Containerização do MongoDB


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
- Sistema de logs abrangente
- Validações avançadas de dados
- Tratamento robusto de erros
- Testes automatizados

## 🎯 Estrutura do Projeto
```
src/
├── config/
│   └── database.js
├── models/
│   ├── plugins/
│   │   └── validationPlugin.js
│   ├── Professor.js
│   ├── Aluno.js
│   ├── Exercicio.js
│   ├── FichaTreino.js
│   └── index.js
├── middleware/
│   └── errorHandler.js
├── utils/
│   └── logger.js
├── tests/
│   ├── teste-inicial.js
│   └── teste-validacao.js
└── app.js
```

## 📋 Critérios de Avaliação

### 1. Implementação dos casos de uso da temática selecionada
O projeto implementa todos os casos de uso necessários para um sistema de academia:
- Modelos de dados completos (Professor, Aluno, Exercício, Ficha de Treino)
- Relacionamentos adequados entre as entidades
- Sistema preparado para CRUD completo de todas as entidades
- Estrutura modular e extensível

### 2. Verificação do preenchimento de campos obrigatórios
O sistema implementa validações robustas em múltiplos níveis:
- Validações no nível do modelo usando Mongoose Schema
- Plugin de validação personalizado (`src/models/plugins/validationPlugin.js`)
- Validações específicas para cada campo (exemplo no modelo Professor):
  - Email: formato válido, único, obrigatório
  - Senha: comprimento mínimo, caracteres especiais
  - Nome: tamanho mínimo e máximo, obrigatório
- Mensagens de erro personalizadas para cada validação

### 3. Tratamento de exceções lançadas pelas bibliotecas utilizadas
O sistema possui um tratamento de erros abrangente:
- Middleware centralizado de tratamento de erros (`src/middleware/errorHandler.js`)
- Tratamento específico para erros do Mongoose
- Captura de exceções não tratadas no nível da aplicação
- Tratamento de erros de conexão com o banco de dados
- Classe personalizada AppError para melhor controle de erros

### 4. Armazenamento de arquivos de log com as exceções capturadas
Sistema completo de logging implementado:
- Logger centralizado (`src/utils/logger.js`)
- Armazenamento de logs em arquivo (`/logs/app.log`)
- Logs estruturados em JSON com:
  - Timestamp
  - Nível do log (INFO, WARN, ERROR)
  - Mensagem detalhada
  - Stack trace para erros
- Logs automáticos para:
  - Operações no banco de dados
  - Validações de dados
  - Erros de aplicação
  - Exceções não tratadas

### 5. Desenvolvimento em Equipe
O projeto está estruturado para desenvolvimento em equipe:
- Estrutura de arquivos organizada e modular
- Documentação clara no README
- Sistema de logs para rastreamento de erros
- Padrões de código consistentes
- Testes automatizados para validação
- Scripts NPM para diferentes tarefas

Para executar os testes de validação e verificar o funcionamento do sistema:
```bash
npm run test:validacao
```

Os resultados dos testes e logs podem ser encontrados em `/logs/app.log`