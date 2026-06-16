#### Aluno: Maria Eduarda de Araújo Silva

# Delivery Tracker API

API para rastreamento de entregas e gerenciamento de motoristas, desenvolvida para a disciplina de PWEB.
O projeto aplica arquitetura em camadas (**Controller → Service → Repository**), injeção de dependência e persistência em memória. 
A API permite gerenciar entregas, controlar o ciclo de vida de cada encomenda, consultar histórico de eventos e cadastrar motoristas para atribuição às entregas. 

## Estrutura do projeto
src/ <br>
├── bootstrap/ <br>
├── config/ <br>
├── controllers/ <br>
├── database/ <br>
├── interfaces/ <br>
├── middlewares/ <br>
├── repositories/ <br>
├── routes/ <br>
├── services/ <br>
├── utils/ <br>
.env.example
app.js <br>
server.js

A aplicação segue separação de responsabilidades:

* **bootstrap**: inicializa a aplicação, conectando todas as partes e prepara o sistema para iniciar
* **config**: armazena configurações da aplicação
* **controllers**: recebem a requisição e devolvem a resposta HTTP
* **database**: simula o banco de dados
* **interfaces**: definem os contratos que os repositories devem implementar
* **middlewares**: interceptam requisições antes de chegarem aos controllers
* **repositories**: lidam com os dados em memória
* **routes**: fazem a composição das dependências e definem os endpoints
* **services**: concentram as regras de negócio
* **utils**: funções auxiliares reutilizáveis.

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

## Relatórios
* Exibir o status e a quantidade de entregas
* Mostrar os motoristas ativos.
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

## Relatorios
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
## Relatórios

### Entregas por status
```http
GET /api/relatorios/entregas-por-status
```

### Motoristas ativos
```http
GET /api/relatorios/motoristas-ativos
```

# Diagrama
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
node src/database/migration.sql.js
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
### Listar status e quantidade de entregas
```bash
curl http://localhost:3000/api/relatorios/entregas-por-status
```

## Análise de Brechas de Cobertura de Testes

Esta seção documenta os trechos críticos de código que atualmente possuem cobertura zero de testes, avaliando os riscos associados e a necessidade de implementação de testes futuros.

### 1. Módulo de Motoristas: (`motoristas.repository.prisma.js`)
* **Status de Cobertura:** 0% de Linhas, Instruções e Funções (Linhas 6-37).

#### Por que este trecho não está sendo testado?
Os testes focaram majoritariamente no que foi pedido na atividade 15. Desta forma, os testes de motoristas acabaram sendo negligenciados.

#### Qual seria o impacto de um bug nele?
O impacto pode ser **crítico**, já que o arquivo é o responsável direto por conectar-se com o banco de dados (via Prisma ORM) para salvar e buscar motoristas. Em caso de errosde sintaxe ou de mapeamento de campos, pode ocorrer:
* Falha na associação de motoristas novos às entregas.
* Falhas de banco de dados (como quebra de chaves estrangeiras) podem travar as requisições.

#### Vale a pena escrever um teste? Sim
---

### 2. Regras de Negócio de Motoristas: (`motoristas.service.js`)
* **Status de Cobertura:** 7.14% Stmts | 8.69% Lines (Linhas não cobertas: 9-42).

#### Por que este trecho não está sendo testado?
Pelos mesmos motivos do repositório

#### Qual seria o impacto de um bug nele?
O impacto é **alto** já que a camada de serviço abriga as validações de negócio do sistema. Um bug aqui poderia permitir:
* Cadastros duplicados de motoristas no sistema.
* Falhas na propagação de erros customizados (como o `AppError`), fazendo com que o frontend não saiba tratar erros de validação vindos do backend.

#### Vale a pena escrever um teste? Sim