#### Aluno: Maria Eduarda de Araújo Silva

# Delivery Tracker API

API para rastreamento de entregas e gerenciamento de motoristas, desenvolvida para a disciplina de PWEB.
O projeto aplica arquitetura em camadas (**Controller → Service → Repository**), injeção de dependência e persistência em memória. 
A API permite gerenciar entregas, controlar o ciclo de vida de cada encomenda, consultar histórico de eventos e cadastrar motoristas para atribuição às entregas. 

## Estrutura do projeto
src/ <br>
├── controllers/ <br>
├── services/ <br>
├── repositories/ <br>
├── database/ <br>
├── routes/ <br>
├── utils/ <br>
├── middlewares/ <br>
app.js <br>
server.js

A aplicação segue separação de responsabilidades:

* **controllers**: recebem a requisição e devolvem a resposta HTTP
* **services**: concentram as regras de negócio
* **repositories**: lidam com os dados em memória
* **database**: simula o banco de dados
* **routes**: fazem a composição das dependências e definem os endpoints.

# Funcionalidades <br>
## Entregas
* Criar entrega
* Listar entregas
* Buscar entrega por ID
* Filtrar entregas por status
* Avançar status da entrega
* Cancelar entrega
* Consultar histórico da entrega. 

## Motoristas
* Cadastrar motorista
* Listar motoristas
* Buscar motorista por ID
* Listar entregas atribuídas a um motorista
* Atribuir motorista a uma entrega.  
<br>

# Principais Regras de Negócio
## Entregas
* Uma entrega pode assumir os status:
  * `CRIADA`
  * `EM_TRANSITO`
  * `ENTREGUE`
  * `CANCELADA`
* As transições válidas são:
  * `CRIADA → EM_TRANSITO`
  * `EM_TRANSITO → ENTREGUE`
* Não é permitido:
  * avançar entrega já finalizada
  * cancelar entrega já entregue
  * criar entregas ativas duplicadas com mesma descrição, origem e destino
* Toda entrega mantém um histórico de eventos. 

## Motoristas
* O CPF deve ser único
* O motorista é criado com status `ATIVO`
* Só é permitido atribuir motorista a entrega com status `CRIADA`
* Não é permitido atribuir motorista `INATIVO`
* A troca de motorista deve gerar evento no histórico da entrega. 
<br>

# Rotas da API
## Entregas
### Criar entrega
```http
POST /api/entregas
```

Body:

```json
{
  "descricao": "Produto",
  "origem": "Local 1",
  "destino": "Local 2"
}
```

### Listar entregas
```http
GET /api/entregas
```

### Filtrar por status
```http
GET /api/entregas?status=EM_TRANSITO
```

### Buscar entrega por ID
```http
GET /api/entregas/:id
```

### Avançar entrega
```http
PATCH /api/entregas/:id/avancar
```

### Cancelar entrega
```http
PATCH /api/entregas/:id/cancelar
```

### Consultar histórico
```http
GET /api/entregas/:id/historico
```

## Motoristas

### Criar motorista
```http
POST /api/motoristas
```

Body:
```json
{
  "nome": "Motorista",
  "cpf": "12345678900",
  "placaVeiculo": "ABC1D23"
}
```

### Listar motoristas
```http
GET /api/motoristas
```

### Buscar motorista por ID
```http
GET /api/motoristas/:id
```
### Buscar entregas de um motorista

```http
GET /api/motoristas/:id/entregas
```

### Filtrar entregas de um motorista por status
```http
GET /api/motoristas/:id/entregas?status=CRIADA
```

### Atribuir motorista a uma entrega
```http
PATCH /api/entregas/:id/atribuir
```
Body:
```json
{
  "motoristaId": 1
}
```

# Diagrama
```
Database 
(Instância compartilhada)
    ↓
EntregasRepository      MotoristasRepository
(IEntregasRepository)   (IMotoristasRepository)
    ↓         ↘        ↙
EntregasService    MotoristasService
    ↓                  ↓
EntregasController  MotoristasController
    ↓                  ↓
entregas.routes.js  motoristas.routes.js
    ↘              ↙
       bootstrap.js
```

# Instruções de execução
## Como executar
### Pré-requisitos
- Node.js 18+

### Instalação
```bash
npm install
```
### Execução
```bash
node server.js
```

A API estará disponível em `http://localhost:3000`

##  Exemplos com cURL
### Exemplos de requisição
### Criar motorista
```bash
curl -X POST http://localhost:3000/api/motoristas \
-H "Content-Type: application/json" \
-d '{"nome":"João Silva","cpf":"12345678900","placaVeiculo":"ABC1D23"}'
```
### Criar entrega
```bash
curl -X POST http://localhost:3000/api/entregas \
-H "Content-Type: application/json" \
-d '{"descricao":"Caixa","origem":"Maceió","destino":"Recife"}'
```
### Atribuir motorista
```bash
curl -X PATCH http://localhost:3000/api/entregas/1/atribuir \
-H "Content-Type: application/json" \
-d '{"motoristaId":1}'
```
### Listar entregas do motorista
```bash
curl http://localhost:3000/api/motoristas/1/entregas
```
