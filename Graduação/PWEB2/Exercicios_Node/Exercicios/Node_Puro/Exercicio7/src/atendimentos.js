import http from "http"

const atendimentos = []

const server = http.createServer((req, res) =>{
    if (req.method === "GET" && req.url === "/health"){
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(JSON.stringify({status: "OK"}))
        return
    }
    if (req.method === "GET" && req.url === "/atendimentos"){
        res.writeHead(200, {"Content-Type":"application/json"})
        res.end(JSON.stringify(atendimentos))
    }
    if (req.method === "GET" && req.url.startsWith("/atendimentos/")) {
        let url = req.url
        let separaUrl = url.split("/")
        let converteNum = parseInt(separaUrl[2], 10)

        for (let i = 0; i < atendimentos.length; i++) {
            if (converteNum === atendimentos[i].id){
                res.writeHead(200, {"Content-Type":"application/json"})
                res.end(JSON.stringify(atendimentos[i]))
                return
            }
        }
        res.writeHead(404, {"Content-Type":"application/json"})
        res.end(JSON.stringify({erro: "ID não encontrado"}))
    }
    if (req.method === "POST" && req.url === "/atendimentos"){
        let body = ""
        req.on("data", chunk =>{
            body += chunk.toString()
        })
        req.on("end", () => {
            try{
                const dados = JSON.parse(body)
                const { aluno, assunto } = dados

                if (!aluno || !assunto){
                    res.writeHead(422, {"Content-Type":"application/json"})
                    res.end(JSON.stringify({erro: "Campo obrigatório ausente"}))
                    return
                }
                const novoAtendimento = {
                    id: atendimentos.length + 1,
                    aluno,
                    assunto,
                }
                atendimentos.push(novoAtendimento)
                res.writeHead(201, {"Content-Type":"application/json"})
                res.end(JSON.stringify(novoAtendimento))
            }catch (erro){
                res.writeHead(400, {"Content-Type":"application/json"})
                res.end(JSON.stringify({erro: "JSON inválido"}))
            }
        })
        return
    }
})

server.listen(3000, () =>{
    console.log("Server ouvindo na porta 3000")
})