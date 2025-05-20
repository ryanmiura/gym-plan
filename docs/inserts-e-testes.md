# 📥 Inserts e Testes - Fit Plan

## 🗄️ Inserts de Exemplo

### 1. Inserir Professores
```javascript
db.professors.insertMany([
  {
    nome: "João Silva",
    email: "joao.silva@email.com",
    senha: "$2a$10$xYh2JQHXz9nzQfM7T2BQz.X5Y3n0F9D1Ry.E9K1h.ICkDQZzFEHZy", // hash de "senha123"
    dataCriacao: new Date()
  },
  {
    nome: "Ana Santos",
    email: "ana.santos@email.com",
    senha: "$2a$10$xYh2JQHXz9nzQfM7T2BQz.X5Y3n0F9D1Ry.E9K1h.ICkDQZzFEHZy",
    dataCriacao: new Date()
  }
])
```

### 2. Inserir Alunos
```javascript
db.alunos.insertMany([
  {
    nome: "Maria Oliveira",
    email: "maria.oliveira@email.com",
    senha: "$2a$10$xYh2JQHXz9nzQfM7T2BQz.X5Y3n0F9D1Ry.E9K1h.ICkDQZzFEHZy",
    professorId: ObjectId("507f1f77bcf86cd799439011"),
    dataCriacao: new Date()
  },
  {
    nome: "Pedro Costa",
    email: "pedro.costa@email.com",
    senha: "$2a$10$xYh2JQHXz9nzQfM7T2BQz.X5Y3n0F9D1Ry.E9K1h.ICkDQZzFEHZy",
    professorId: ObjectId("507f1f77bcf86cd799439011"),
    dataCriacao: new Date()
  }
])
```

### 3. Inserir Exercícios
```javascript
db.exercicios.insertMany([
  {
    nome: "Supino Reto",
    grupoMuscular: "Peitoral",
    series: 4,
    repeticoes: 12,
    observacoes: "Manter cotovelos alinhados durante o movimento"
  },
  {
    nome: "Agachamento Livre",
    grupoMuscular: "Pernas",
    series: 4,
    repeticoes: 10,
    observacoes: "Manter a coluna reta e descer até paralelo"
  },
  {
    nome: "Puxada Alta",
    grupoMuscular: "Costas",
    series: 3,
    repeticoes: 12,
    observacoes: "Puxar a barra até a altura do peito"
  }
])
```

### 4. Inserir Ficha de Treino
```javascript
db.fichasTreino.insertOne({
  professorId: ObjectId("507f1f77bcf86cd799439011"),
  alunoId: ObjectId("507f1f77bcf86cd799439012"),
  dataInicio: new Date(),
  dataFim: new Date(new Date().setMonth(new Date().getMonth() + 1)),
  segunda: [
    {
      exercicioId: ObjectId("507f1f77bcf86cd799439013"),
      series: 4,
      repeticoes: 12,
      observacoes: "Aumentar carga gradualmente"
    }
  ],
  terca: [
    {
      exercicioId: ObjectId("507f1f77bcf86cd799439014"),
      series: 4,
      repeticoes: 10,
      observacoes: "Foco na execução correta"
    }
  ],
  quarta: [],
  quinta: [],
  sexta: [],
  sabado: [],
  domingo: []
})
```

## 🧪 Documentos para Teste

### 1. Teste de Busca de Professor
```javascript
// Buscar professor por email
db.professors.findOne({ email: "joao.silva@email.com" })

// Buscar todos os alunos de um professor
db.alunos.find({ professorId: ObjectId("507f1f77bcf86cd799439011") })
```

### 2. Teste de Busca de Aluno
```javascript
// Buscar aluno por email
db.alunos.findOne({ email: "maria.oliveira@email.com" })

// Buscar todas as fichas de treino de um aluno
db.fichasTreino.find({ alunoId: ObjectId("507f1f77bcf86cd799439012") })
```

### 3. Teste de Busca de Exercícios
```javascript
// Buscar exercícios por grupo muscular
db.exercicios.find({ grupoMuscular: "Peitoral" })

// Buscar exercício por nome
db.exercicios.findOne({ nome: "Supino Reto" })
```

### 4. Teste de Busca de Fichas
```javascript
// Buscar fichas ativas (data fim maior que hoje)
db.fichasTreino.find({
  dataFim: { $gt: new Date() }
})

// Buscar fichas por professor e aluno
db.fichasTreino.find({
  professorId: ObjectId("507f1f77bcf86cd799439011"),
  alunoId: ObjectId("507f1f77bcf86cd799439012")
})