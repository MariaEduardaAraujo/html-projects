import http from "http"

const hostname = "127.0.0.1"
const port = 3000

const server = http.createServer((req, res) => {
    if (req.url === "/"){
        res.end("Hello Node")
    }else if (req.url === "/health"){
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify({status: 'OK'}))
        return
    }
    res.writeHead(404)
    res.end()
})

server.listen(port, hostname, () =>{
    console.log(`Servidor ouvindo em: http://${hostname}:${port}/`)
})