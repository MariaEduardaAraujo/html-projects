import http from "http"

const chamados = []

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/health"){
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(JSON.stringify({status: "OK"}))
        return
    }
    if (req.method === "GET" && req.url === "/chamados"){
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(JSON.stringify(chamados))
        return
    }
    if (req.method === "GET" && req.url.startsWith("/chamados/")){
        let url = req.url
        let converteUrl = url.split("/")
        let converteId = parseInt(converteUrl[2], 10)

        for (let i = 0; i < chamados.length; i++) {
            if (converteId == chamados[i].id){
                res.writeHead(200, {"Content-Type":"application/json"})
                res.end(JSON.stringify(chamados[i]))
                return
            }
        }
        res.writeHead(404, {"Content-Type":"application/json"})
        res.end(JSON.stringify({erro: "ID não encontrado"}))
        return
    }
    if (req.method === "POST" && req.url === "/chamados"){
        let body = ""
        req.on("data", chunk => {
            body += chunk.toString()
        })
        req.on("end", () => {
            try {
                const dados = JSON.parse(body)
                const { solicitante, descricao, prioridade } = dados

                if (!solicitante || !descricao || !prioridade) {
                    res.writeHead(422, {"Content-Type":"application/json"})
                    res.end(JSON.stringify({erro: "Campo obrigatório ausente"}))
                    return
                }

                const novoChamado = {
                    id: chamados.length + 1,
                    solicitante, 
                    descricao,
                    prioridade
                }
                chamados.push(novoChamado)
                res.writeHead(201, {"Content-Type":"application/json"})
                res.end(JSON.stringify(novoChamado))
                return

            } catch (error) {
                res.writeHead(400, {"Content-Type":"application/json"})
                res.end(JSON.stringify({erro: "JSON inválido"}))
                return
            }
        })
    }
})

server.listen(3000, () => {
    console.log("Servidor ouvindo na porta 3000")
})