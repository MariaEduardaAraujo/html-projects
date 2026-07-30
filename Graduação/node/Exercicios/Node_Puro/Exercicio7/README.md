ATIVIDADE 03 — API HTTP COM NODE.JS (INDIVIDUAL)

Disciplina: Programação Web 2 <br>
Modalidade: Individual <br>
Entrega: Via GitHub Classroom <br>
Peso: Conforme plano da disciplina <br>

---

1. CONTEXTO

Você deverá implementar uma API HTTP utilizando apenas o módulo nativo http do Node.js.

Não é permitido utilizar Express.

O sistema deverá permitir:

* Verificar se o serviço está ativo
* Listar registros
* Buscar registro por ID
* Criar novo registro

Os dados deverão ser armazenados em memória (array).

---

2. REGRAS

* Não utilizar Express
* Não utilizar banco de dados
* Utilizar ECMAScript Modules (import e export)
* O servidor deve rodar na porta 3000
* O arquivo principal deve ser: src/server.js
* Deve utilizar biblioteca para parsing de JSON no body
* O código deve ser escrito integralmente por você

---

4. VARIAÇÕES

**Variação 0**
Recurso: /atendimentos
Campos obrigatórios:

* aluno
* assunto

**Variação 1**
Recurso: /chamados
Campos obrigatórios:

* solicitante
* descricao
* prioridade

**Variação 2**
Recurso: /protocolos
Campos obrigatórios:

* nome
* tipo
* data

**Variação 3**
Recurso: /requerimentos
Campos obrigatórios:

* estudante
* categoria
* observacao

---

5. ENDPOINTS OBRIGATÓRIOS

GET /health:
Retornar JSON indicando que o serviço está ativo.

GET /seu-recurso:
Retornar lista completa.

GET /seu-recurso/:id:
Retornar item específico por ID.
Se não existir:

* Status 404
* JSON com mensagem de erro

POST /seu-recurso

Deve:

* Ler JSON do body
* Validar campos obrigatórios
* Criar ID incremental
* Armazenar no array
* Retornar status 201
* Retornar objeto criado

Erros obrigatórios:

* JSON inválido → 400
* Campo obrigatório ausente → 422

---