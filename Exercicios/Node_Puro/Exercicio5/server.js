import http from "http"
import {mensagemSaudacao} from "./mensagem.js"
import {mensagemErro} from "./mensagem.js"

const hostname = "127.0.0.1"
const port = 3000

const server = http.createServer((req, res) => {
    if (req.url === "/"){
        res.end(mensagemSaudacao())
    }
    res.end(mensagemErro())
})

server.listen(port, hostname, () => {
    console.log(`Servidor ouvindo em: http://${hostname}:${port}/`)
})