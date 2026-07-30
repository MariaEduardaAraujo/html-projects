import express from "express"
import produtosRouter from "./routes/produtos.routes.js"
import { ErroMiddleware } from "./middlewares/erro.middleware.js"

const app = express()
app.use(express.json())

app.use("/produtos", produtosRouter)
app.use(ErroMiddleware)

export default app