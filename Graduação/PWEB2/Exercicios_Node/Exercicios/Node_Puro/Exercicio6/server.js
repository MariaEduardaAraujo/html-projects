import http from "http"
import {soma} from "./calculadora.js"
import {subtracao} from "./calculadora.js"
import {multiplicacao} from "./calculadora.js"

const hostname = "127.0.0.1"
const port = 3000

const server = http.createServer((req, res) => {
    if (req.url === "/soma"){
        res.end(soma())
    }
    if (req.url === "/subtracao"){
        res.end(subtracao())
    }
    if (req.url === "/multiplicacao"){
        res.end(multiplicacao())
    }
})

server.listen(port, hostname, () => {
    console.log(`Servidor ouvindo em: http://${hostname}:${port}/`)
})