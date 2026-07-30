import express from "express"

const app = express()
app.use(express.json())

app.get("/health", (req, res) => {
    res.status(200).json({status: "OK"})
})

app.get("/sobre", (req, res) => {
    res.status(200).json({mensagem: "API desenvolvida para estudo de Express"})
})

app.listen(3000)