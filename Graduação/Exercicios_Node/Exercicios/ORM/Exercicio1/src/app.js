import express from "express"
import livrosRouter from "./routes/livros.router.js"
import { errorMiddleware } from "./middlewares/error.middleware.js"

const app = express()
app.use(express.json())

app.use("/api/livros", livrosRouter)

app.use(errorMiddleware)

export default app