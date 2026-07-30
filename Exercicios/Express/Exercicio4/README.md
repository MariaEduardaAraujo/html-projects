# PWEB2 – ATIVIDADE EXTRA

## API DE GERENCIAMENTO DE RESERVAS DE LABORATÓRIO

Esta atividade deve ser feita individualmente.

A ideia é simular o desenvolvimento de uma API REST para controlar reservas de laboratórios de informática do IFAL.

---

## Cenário-problema

O IFAL deseja criar uma API para gerenciar **reservas de laboratórios** para aulas, minicursos e oficinas.

Cada reserva possui:

* `id` (number)
* `responsavel` (string)
* `laboratorio` (string)
* `data` (string)
* `turno` (enum: `manha | tarde | noite`)
* `capacidadeSolicitada` (number)
* `finalidade` (string)
* `ativa` (boolean)
* `dataCriacao` (string ISO)

---

# Requisitos funcionais e respectivas rotas

1. Listar todas as reservas
   `GET /reservas`

2. Buscar reserva por id
   `GET /reservas/:id`

3. Criar reserva
   `POST /reservas`

4. Atualizar reserva
   `PUT /reservas/:id`

5. Remover reserva
   `DELETE /reservas/:id`

6. Listar apenas reservas ativas
   `GET /reservas?ativa=true`

7. Filtrar por turno
   `GET /reservas?turno=manha`

8. Filtrar por capacidade mínima solicitada
   `GET /reservas?capacidadeMin=20`

9. Cancelar reserva
   `PATCH /reservas/:id/cancelar`

10. Reativar reserva
    `PATCH /reservas/:id/reativar`

---

# Middlewares obrigatórios

Além das rotas, você deverá implementar os seguintes middlewares:

## 1. Middleware global de log

Esse middleware deve ser executado em **todas as requisições**.

Ele deve exibir no terminal:

* método HTTP
* URL
* data/hora

Exemplo de saída:

```text
[2026-03-12T12:00:00.000Z] GET /reservas
```

---

## 2. Middleware de validação de ID

Esse middleware deve ser aplicado apenas nas rotas que usam `:id`.

Ele deve:

* verificar se o `id` é numérico
* se não for, retornar `400 Bad Request`

Resposta esperada:

```json
{
  "mensagem": "ID inválido"
}
```

---

## 3. Middleware de validação de criação de reserva

Esse middleware deve ser aplicado na rota:

```text
POST /reservas
```

Ele deve validar os campos obrigatórios:

* `responsavel`
* `laboratorio`
* `data`
* `turno`
* `capacidadeSolicitada`
* `finalidade`

Regras:

* nenhum campo pode estar ausente
* `capacidadeSolicitada` deve ser número
* `turno` deve ser apenas: `manha`, `tarde` ou `noite`

Se houver erro, retornar `422 Unprocessable Entity`

Exemplo:

```json
{
  "mensagem": "Dados inválidos para criação da reserva"
}
```

---

## 4. Middleware de validação de existência da reserva

Esse middleware deve ser aplicado nas rotas com `:id` que precisam de uma reserva existente.

Ele deve:

* buscar a reserva pelo id
* se não existir, retornar `404 Not Found`

Exemplo:

```json
{
  "mensagem": "Reserva não encontrada"
}
```

💡 Dica: você pode salvar a reserva encontrada em `req.reserva`.

---

# Regras da atividade

* Usar **Express**
* Usar **ECMAScript Modules**
* Não usar banco de dados real
* Armazenar os dados em memória
* Utilizar `express.json()`
* Organizar o projeto em arquivos separados
* Usar middlewares de forma correta
* Retornar status HTTP adequados

---

# Regras esperadas por rota

## GET /reservas

* retorna todas as reservas
* se houver query, filtrar conforme os parâmetros recebidos

## GET /reservas/:id

* retorna a reserva específica

## POST /reservas

* cria uma nova reserva
* retorna `201 Created`

## PUT /reservas/:id

* atualiza uma reserva existente
* retorna `200 OK`

## DELETE /reservas/:id

* remove uma reserva
* retorna `204 No Content`

## PATCH /reservas/:id/cancelar

* define `ativa = false`

## PATCH /reservas/:id/reativar

* define `ativa = true`

---

# Casos de teste que você deve conseguir executar com cURL

## Criar reserva

```bash
curl -i -X POST http://localhost:3000/reservas \
-H "Content-Type: application/json" \
-d "{\"responsavel\":\"Maria\",\"laboratorio\":\"Lab 01\",\"data\":\"2026-03-20\",\"turno\":\"manha\",\"capacidadeSolicitada\":25,\"finalidade\":\"Oficina de Node\"}"
```

## Listar reservas

```bash
curl -i http://localhost:3000/reservas
```

## Buscar por id

```bash
curl -i http://localhost:3000/reservas/1
```

## Filtrar por turno

```bash
curl -i "http://localhost:3000/reservas?turno=manha"
```

## Cancelar reserva

```bash
curl -i -X PATCH http://localhost:3000/reservas/1/cancelar
```

---

# Critérios de avaliação sugeridos

* funcionamento correto das rotas
* uso correto dos middlewares
* organização do código
* uso adequado de status HTTP
* clareza dos retornos JSON
* separação entre `app.js` e `server.js`

---

# Desafio extra

Se quiser subir um pouco o nível, adicione também:

* middleware de erro global
* arquivo de rotas separado (`reservas.routes.js`)
* validação para impedir capacidade solicitada menor que 1
* validação para impedir atualização de `id` e `dataCriacao`