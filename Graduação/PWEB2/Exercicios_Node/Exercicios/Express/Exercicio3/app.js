import express from "express"

const app = express()
app.use(express.json())

const produtos = []

app.post("/produtos", (req, res) => {
    const { nome, preco } = req.body
    if (!nome || !preco){
        res.status(422).json({mensagem: "Campos inválidos"})
        return
    }
    
    const id = produtos.length + 1
    const novoProduto = {
        id,
        nome,
        preco
    }
    produtos.push(novoProduto)

    res.status(201).json(novoProduto)
})

export default app