Clarinho que sim! 😄

Com base no padrão do Capítulo 4 — **MVC adaptado para APIs REST, Service, Repository, injeção de dependência e refatoração do projeto** — montei uma atividade prática para você pegar a API que já fez e reorganizá-la nesse modelo. O capítulo deixa claro que o controller deve só orquestrar a requisição/resposta, o service concentra regras de negócio, e o repository abstrai o acesso aos dados. ([Leo Fernandes][1])

---

# Atividade prática — Refatoração para MVC + Service + Repository

## Objetivo

Refatorar sua API de reservas para uma arquitetura em camadas, separando:

* **routes**: definem caminhos e ligam middlewares/controllers
* **controllers**: recebem `req`, chamam o service e devolvem `res`
* **services**: concentram regras de negócio e não conhecem `req`/`res`
* **repositories**: fazem o acesso aos dados em memória
* **database**: mantém a estrutura bruta dos dados

Essa separação é exatamente a motivação do capítulo: evitar “controller gordo”, melhorar testabilidade e desacoplar regras de negócio do transporte HTTP e da persistência. ([Leo Fernandes][1])

---

## Cenário

Você já possui uma API de reservas de laboratório. Agora seu trabalho é **refatorar**, sem mudar o comportamento externo da API.

Sua API deve continuar oferecendo:

* `GET /reservas`
* `GET /reservas/:id`
* `POST /reservas`
* `PUT /reservas/:id`
* `DELETE /reservas/:id`
* `PATCH /reservas/:id/cancelar`
* `PATCH /reservas/:id/reativar`

E também continuar aceitando filtros por query, como:

* `GET /reservas?ativa=true`
* `GET /reservas?turno=manha`
* `GET /reservas?capacidadeMin=20`

---

# Regras arquiteturais obrigatórias

## 1. Controller não pode ter regra de negócio

No controller, você pode:

* ler `req.params`, `req.query`, `req.body`
* chamar métodos do service
* devolver `res.status(...).json(...)`

No controller, você **não pode**:

* filtrar arrays diretamente
* validar regra de domínio
* manipular o array da “base” diretamente

Isso segue a ideia central do capítulo: controller orquestra, não decide a lógica do domínio. ([Leo Fernandes][1])

---

## 2. Service não pode conhecer Express

Seus services **não podem receber `req` ou `res`**.

Eles devem trabalhar só com dados puros, como:

```js
criarReserva(dados)
buscarReservaPorId(id)
listarReservas(filtros)
cancelarReserva(id)
```

O capítulo enfatiza que service deve ser independente do transporte HTTP para poder ser reutilizado e testado mais facilmente. ([Leo Fernandes][1])

---

## 3. Repository deve encapsular o acesso aos dados

Toda leitura e escrita no array deve passar pelo repository.

Nada de fazer isso no service:

```js
this.database.reservas.push(...)
```

A ideia do Repository Pattern aqui é justamente isolar o mecanismo de persistência atrás de um contrato simples. ([Leo Fernandes][1])

---

## 4. Use injeção de dependência manual

Seu service deve receber o repository no construtor, e o controller deve receber o service.

Exemplo da ideia:

* `ReservaRepository` é criado
* `ReservasService` recebe esse repository
* `ReservasController` recebe esse service
* as rotas usam o controller

O capítulo apresenta isso como forma simples de reduzir acoplamento e melhorar testabilidade. ([Leo Fernandes][1])

---

# Estrutura esperada

Use esta estrutura mínima:

```text
src/
├── app.js
├── server.js
├── controllers/
│   └── reservas.controller.js
├── services/
│   └── reservas.service.js
├── repositories/
│   └── reservas.repository.js
├── database/
│   └── reservas.database.js
├── routes/
│   ├── index.js
│   └── reservas.routes.js
├── middlewares/
│   ├── log.middleware.js
│   ├── validarId.middleware.js
│   ├── validarReserva.middleware.js
│   └── erros.middleware.js
└── utils/
    └── AppError.js
```

Essa estrutura segue o modelo por tipo de arquivo apresentado no material. ([Leo Fernandes][1])

---

# O que cada arquivo deve fazer

## `database/reservas.database.js`

Responsável por manter a estrutura em memória:

* array de reservas
* próximo id

Não deve conter regra de negócio.

---

## `repositories/reservas.repository.js`

Responsável por operações de persistência, por exemplo:

* `listarTodos()`
* `buscarPorId(id)`
* `criar(dados)`
* `atualizar(id, dados)`
* `remover(id)`

Pode ter também métodos específicos como:

* `listarAtivas()`
* `filtrarPorTurno(turno)`
* `filtrarPorCapacidadeMinima(valor)`

---

## `services/reservas.service.js`

Responsável por regras de negócio, por exemplo:

* não permitir capacidade menor que 1
* não cancelar uma reserva já cancelada
* lançar erro se reserva não existir
* aplicar filtros combinados de listagem

Aqui você deve usar `AppError` para lançar erros com status apropriado.

O capítulo mostra exatamente essa divisão: validações de domínio pertencem ao service; validações de entrada pertencem aos middlewares. ([Leo Fernandes][1])

---

## `controllers/reservas.controller.js`

Responsável por:

* extrair dados de `req`
* chamar o service
* devolver a resposta

Exemplos de métodos:

* `listar`
* `buscarPorId`
* `criar`
* `atualizar`
* `remover`
* `cancelar`
* `reativar`

---

## `routes/reservas.routes.js`

Responsável por mapear:

* `GET /`
* `GET /:id`
* `POST /`
* `PUT /:id`
* `DELETE /:id`
* `PATCH /:id/cancelar`
* `PATCH /:id/reativar`

e aplicar middlewares.

---

## `routes/index.js`

Responsável por agregar os routers, como o material propõe. ([Leo Fernandes][1])

---

## `utils/AppError.js`

Crie uma classe de erro customizada com:

* `message`
* `statusCode`

O capítulo recomenda esse padrão para padronizar a resposta do middleware de erros. ([Leo Fernandes][1])

---

## `middlewares/erros.middleware.js`

Crie um middleware global de erros que:

* identifica `AppError`
* responde com o `statusCode`
* responde `500` para erros inesperados

O middleware de erro deve ficar por último no `app.js`, como indicado no material. ([Leo Fernandes][1])

---

# Requisitos funcionais da refatoração

## Parte 1 — Refatorar sem mudar a API

Sua API deve continuar funcionando igual para o cliente.

Ou seja:

* mesmas rotas
* mesmos métodos HTTP
* mesma ideia de resposta

O foco não é inventar novas funcionalidades, mas melhorar a arquitetura.

---

## Parte 2 — Tirar lógica do controller

Você deve identificar no seu código atual tudo que é:

* filtro de lista
* busca no array
* atualização manual de objeto
* regras de cancelamento/reativação

e mover isso para service/repository.

---

## Parte 3 — Implementar `AppError`

Substitua respostas de erro espalhadas por lançamentos de erro no service, por exemplo:

* reserva não encontrada
* turno inválido em regra de domínio
* tentativa de cancelar reserva inexistente

Depois deixe o middleware de erros montar a resposta final.

---

## Parte 4 — Composição manual

No arquivo de rotas, faça a composição manual das dependências:

* cria database
* cria repository
* cria service
* cria controller

Essa etapa corresponde à “composição no arquivo de rotas” e à injeção manual mostradas no capítulo. ([Leo Fernandes][1])

---

# Entregáveis

## a) Estrutura refatorada

Entregar o projeto com as pastas e arquivos organizados.

## b) Funcionamento das rotas

Demonstrar que as rotas continuam funcionando.

## c) README curto

Seu README deve explicar:

* o papel de controller
* o papel de service
* o papel de repository
* por que essa arquitetura melhora o código

## d) Histórico de commits

Faça pelo menos 6 commits descritivos, por exemplo:

```text
refactor: move acesso a dados para repository
refactor: cria camada de service para reservas
feat: adiciona middleware global de erros
refactor: separa controller de reservas
refactor: cria agregador de rotas
docs: atualiza README com arquitetura do projeto
```

---

# Critérios de correção

Você pode se autoavaliar assim:

### 1. Separação de responsabilidades

O controller ficou enxuto?

### 2. Independência do service

Seu service recebe apenas dados puros?

### 3. Acesso a dados centralizado

Só o repository toca no array?

### 4. Tratamento de erros

Você usa `AppError` + middleware de erros?

### 5. Organização do projeto

A estrutura segue o padrão do capítulo?

---

# Desafio extra

Depois de terminar, faça mais estes refinamentos:

* crie um `asyncHandler` utilitário
* use `routes/index.js` como agregador
* mova filtros de listagem para o service
* prepare o repository para, no futuro, trocar memória por banco real

Isso conversa diretamente com a proposta do capítulo de facilitar evolução e testes. ([Leo Fernandes][1])

---

# Mini checklist de refatoração

Antes:

* rota mexe no array
* controller valida regra de domínio
* erro é respondido em vários lugares

Depois:

* rota chama controller
* controller chama service
* service chama repository
* repository fala com database
* middleware de erro centraliza respostas