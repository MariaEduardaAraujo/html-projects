#### Aluno: Maria Eduarda de Araújo Silva

# Delivery Tracker API

API para rastreamento de entregas e gerenciamento de motoristas, desenvolvida para a disciplina de Programação Web 2 — Backend.
O projeto aplica arquitetura em camadas (**Controller → Service → Repository**), injeção de dependência, persistência com Prisma ORM, autenticação JWT com RBAC, painel administrativo SSR com EJS e frontend React com Vite.

## Estrutura do projeto

```
src/
├── bootstrap/
├── config/
├── controllers/
│   ├── api/
│   └── painel/
├── database/
├── interfaces/
├── middlewares/
├── repositories/
├── routes/
├── services/
├── utils/
├── views/
│   ├── layouts/
│   ├── partials/
│   ├── entregas/
│   └── motoristas/
frontend/
├── src/
│   ├── context/
│   ├── components/
│   ├── pages/
│   └── services/
prisma/
├── schema.prisma
├── migrations/
└── seed.js
tests/
├── unit/
│   └── services/
├── integration/
└── setup.js
.env
.env.test
app.js
server.js
jest.config.js
```

A aplicação segue separação de responsabilidades:

* **bootstrap**: composição única de dependências
* **config**: configurações da aplicação
* **controllers/api**: respondem JSON para a API REST
* **controllers/painel**: respondem `res.render()` para o painel EJS
* **database**: configuração Prisma e SQLite
* **interfaces**: contratos que os repositories implementam
* **middlewares**: autenticação JWT e autorização RBAC
* **repositories**: acesso ao banco via Prisma ORM
* **routes**: endpoints da API e do painel
* **services**: regras de negócio
* **utils**: AppError, JWT helpers
* **views**: templates EJS do painel administrativo
* **frontend**: SPA React com Vite

---

# Funcionalidades

## Entregas
* Criar entrega
* Listar entregas com paginação e filtros
* Buscar entrega por ID
* Filtrar por status, motorista e intervalo de datas
* Avançar status da entrega
* Cancelar entrega
* Consultar histórico de eventos
* Atribuir motorista

## Motoristas
* Cadastrar motorista
* Listar motoristas
* Buscar motorista por ID
* Listar entregas atribuídas a um motorista
* Atribuir motorista a uma entrega

## Autenticação
* Registrar usuário com bcrypt (custo 10)
* Login com retorno de accessToken JWT
* Middleware de autenticação stateless
* RBAC com papéis OPERADOR e GESTOR

## Painel Administrativo (EJS)
* Listagem de entregas com filtro e paginação visual
* Formulário de nova entrega com PRG e erros inline
* Detalhe com histórico cronológico
* Ações de status via method-override
* Listagem e cadastro de motoristas

## Frontend React
* Login e registro
* Listagem de entregas com filtros
* Detalhe de entrega com histórico e ações
* Listagem e cadastro de motoristas
* Proteção de rotas por papel (OPERADOR / GESTOR)
* Token JWT em localStorage com interceptor Axios

## Relatórios
* Entregas por status
* Motoristas ativos

---

# Principais Regras de Negócio

## Entregas
* Status possíveis: `CRIADA` → `EM_TRANSITO` → `ENTREGUE` / `CANCELADA`
* Transições válidas: `CRIADA → EM_TRANSITO`, `EM_TRANSITO → ENTREGUE`
* Não é permitido avançar entrega finalizada
* Não é permitido cancelar entrega já entregue
* Não podem existir entregas ativas duplicadas com mesma descrição, origem e destino
* Toda entrega mantém histórico auditável de eventos
* Não é permitido avançar entrega sem motorista atribuído

## Motoristas
* CPF deve ser único
* Motorista criado com status `ATIVO`
* Só é permitido atribuir motorista a entrega com status `CRIADA`
* Não é permitido atribuir motorista `INATIVO`
* Troca de motorista gera evento no histórico

## Autenticação e Autorização
* Senhas armazenadas com bcrypt (custo ≥ 10)
* Token JWT com payload: `id`, `nome`, `email`, `papel`
* Token não contém `senhaHash`
* Expiração configurada via `JWT_EXPIRES_IN`
* `PATCH /api/entregas/:id/cancelar` → apenas GESTOR
* `GET /api/relatorios/*` → apenas GESTOR
* `POST /api/motoristas`, `PATCH /api/motoristas/:id` → apenas GESTOR

---

# Rotas da API

## Autenticação

### Registrar usuário
```http
POST /api/auth/registrar
```
Body:
```json
{
  "nome": "Maria",
  "email": "maria@email.com",
  "senha": "senha123"
}
```

### Login
```http
POST /api/auth/login
```
Body:
```json
{
  "email": "maria@email.com",
  "senha": "senha123"
}
```
Resposta:
```json
{
  "accessToken": "eyJ..."
}
```

## Entregas

### Criar entrega
```http
POST /api/entregas
Authorization: Bearer <token>
```
Body:
```json
{
  "descricao": "Produto",
  "origem": "Maceió",
  "destino": "Recife"
}
```

### Listar entregas
```http
GET /api/entregas?status=EM_TRANSITO&page=1&limit=10
GET /api/entregas?createdDe=2025-01-01&createdAte=2025-06-30
GET /api/entregas?motoristaId=1
Authorization: Bearer <token>
```

### Buscar entrega por ID
```http
GET /api/entregas/:id
Authorization: Bearer <token>
```

### Avançar status
```http
PATCH /api/entregas/:id/avancar
Authorization: Bearer <token>
```

### Cancelar entrega
```http
PATCH /api/entregas/:id/cancelar
Authorization: Bearer <token> (GESTOR)
```

### Atribuir motorista
```http
PATCH /api/entregas/:id/atribuir
Authorization: Bearer <token>
```
Body:
```json
{ "motoristaId": 1 }
```

### Consultar histórico
```http
GET /api/entregas/:id/historico
Authorization: Bearer <token>
```

## Motoristas

### Criar motorista
```http
POST /api/motoristas
Authorization: Bearer <token> (GESTOR)
```
Body:
```json
{
  "nome": "João Silva",
  "cpf": "12345678900",
  "placaVeiculo": "ABC1D23"
}
```

### Listar motoristas
```http
GET /api/motoristas
Authorization: Bearer <token>
```

### Buscar por ID
```http
GET /api/motoristas/:id
Authorization: Bearer <token>
```

### Entregas de um motorista
```http
GET /api/motoristas/:id/entregas
GET /api/motoristas/:id/entregas?status=CRIADA
Authorization: Bearer <token>
```

## Relatórios

```http
GET /api/relatorios/entregas-por-status
GET /api/relatorios/motoristas-ativos
Authorization: Bearer <token> (GESTOR)
```

## Painel Administrativo (EJS)

```
GET  /painel/entregas
GET  /painel/entregas/nova
POST /painel/entregas
GET  /painel/entregas/:id
PUT  /painel/entregas/:id/status
DELETE /painel/entregas/:id/cancelar
GET  /painel/motoristas
GET  /painel/motoristas/novo
POST /painel/motoristas
```

---

# Diagrama de Dependências

```
Database 
(Instância compartilhada)
    ↓
EntregasRepository      MotoristasRepository     RelatoriosRepository 
(IEntregasRepository)   (IMotoristasRepository)           ↓
    ↓         ↘        ↙
EntregasService    MotoristasService              RelatoriosService
      ↓                  ↓                                ↓
EntregasController  MotoristasController          RelatoriosController
      ↓                  ↓                                ↓
entregas.routes.js  motoristas.routes.js          relatorios.routes.js
          ↘                  ↘                          ↙
   

---

# Instruções de Execução
```
## Pré-requisitos
* Node.js 18+


## Instalação

npm install

## Migration e Seed

npx prisma migrate dev --name init
node prisma/seed.js

## Execução

node server.js

API disponível em `http://localhost:3000`

Painel disponível em `http://localhost:3000/painel/entregas`

## Frontend React

cd frontend
npm install
npm run dev

Frontend disponível em `http://localhost:5174`

---

# Testes

## Configuração

Criar `.env.test`:

DATABASE_URL="file:./test.db"
JWT_SECRET=chave_secreta_minimo_32_caracteres
JWT_EXPIRES_IN=8h

## Scripts
```
npm test               # unitários + integração
npm run test:watch     # modo watch
npm run test:coverage  # relatório de cobertura
npm run test:e2e       # testes Playwright
```

## Executar por camada

```bash
# Apenas unitários
npx jest tests/unit

# Apenas integração
npx jest tests/integration

# Apenas E2E
npx playwright test
```

## Estrutura

```
tests/
├── unit/
│   └── services/
│       ├── EntregasService.test.js
│       └── AuthService.test.js
├── integration/
│   ├── auth.routes.test.js
│   └── entregas.routes.test.js
└── setup.js
frontend/tests/e2e/
├── pages/
│   ├── LoginPage.js
│   └── EntregasPage.js
├── login.spec.js
└── entregas.spec.js
```

## Limiares de Cobertura

| Camada | Mínimo |
|---|---|
| `src/services/` | 80% statements |
| `src/middlewares/` | 85% statements |
| `src/utils/` | 75% statements |

---

# Análise de Brechas de Cobertura de Testes

## 1. Módulo de Motoristas (`motoristas.repository.prisma.js`)

**Status de Cobertura:** 0% de Linhas, Instruções e Funções (Linhas 6–37).

**Por que não está sendo testado?**
Os testes focaram nos cenários exigidos na atividade 15. Os testes de motoristas acabaram sendo negligenciados.

**Qual seria o impacto de um bug?**
Impacto **crítico** — arquivo responsável direto pela conexão com banco via Prisma. Erros de sintaxe ou mapeamento de campos podem causar falha na associação de motoristas às entregas e quebra de chaves estrangeiras travando requisições.

**Vale a pena escrever um teste?** Sim.

---

## 2. Regras de Negócio de Motoristas (`motoristas.service.js`)

**Status de Cobertura:** 7.14% Stmts | 8.69% Lines (Linhas não cobertas: 9–42).

**Por que não está sendo testado?**
Pelos mesmos motivos do repositório — foco apenas nos cenários da atividade.

**Qual seria o impacto de um bug?**
Impacto **alto** — camada de serviço abriga validações de negócio. Um bug poderia permitir cadastros duplicados de motoristas e falhar na propagação de `AppError`, impedindo o frontend de tratar erros de validação corretamente.

**Vale a pena escrever um teste?** Sim.

---

# Exemplos com cURL

## Registrar usuário
```bash
curl -X POST http://localhost:3000/api/auth/registrar \
-H "Content-Type: application/json" \
-d '{"nome":"Admin","email":"admin@test.com","senha":"senha123","papel":"GESTOR"}'
```

## Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"admin@test.com","senha":"senha123"}'
```

## Criar motorista
```bash
curl -X POST http://localhost:3000/api/motoristas \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{"nome":"João Silva","cpf":"12345678900","placaVeiculo":"ABC1D23"}'
```

## Criar entrega
```bash
curl -X POST http://localhost:3000/api/entregas \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{"descricao":"Caixa","origem":"Maceió","destino":"Recife"}'
```

## Atribuir motorista
```bash
curl -X PATCH http://localhost:3000/api/entregas/1/atribuir \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <token>" \
-d '{"motoristaId":1}'
```

## Listar entregas paginadas
```bash
curl "http://localhost:3000/api/entregas?page=1&limit=10" \
-H "Authorization: Bearer <token>"
```

## Listar entregas do motorista
```bash
curl http://localhost:3000/api/motoristas/1/entregas \
-H "Authorization: Bearer <token>"
```

## Relatório de status
```bash
curl http://localhost:3000/api/relatorios/entregas-por-status \
-H "Authorization: Bearer <token>"
```