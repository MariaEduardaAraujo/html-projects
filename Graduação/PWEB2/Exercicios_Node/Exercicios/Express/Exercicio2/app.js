import express from "express"

const app = express()
app.use(express.json())

const users = [
    {id: 1, nome: "Maria"},
    {id: 2, nome: "João"},
    {id: 3, nome: "Daniel"}
]

app.get("/usuarios/:id", (req, res) => {
    if (true){
        const {id} = req.params
        const usuario = users.find(x => x.id === Number(id))
        if (!usuario){
            res.status(404).json({mensagem: "Usuário não encontrado"})
            return
        }
        res.status(200).json({ nome: usuario.nome })
    }
    
})

export default app