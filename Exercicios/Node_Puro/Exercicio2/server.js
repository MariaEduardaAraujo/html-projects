import http from "http"

const hostname = "127.0.0.1"
const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader = ("Content-Type", "text/html;")
    res.end("Hello Node")
})

server.listen(port, hostname, () =>{
    console.log(`Servidor ouvindo em: http://${hostname}:${port}/`)
})