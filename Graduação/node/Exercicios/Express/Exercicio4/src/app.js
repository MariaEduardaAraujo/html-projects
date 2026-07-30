import express from "express"
import { logMiddleware } from "./middlewares/log.middleware.js"
import reservasRouter from "./router/reservas.routes.js"

const app = express()
app.use(express.json())

app.use(logMiddleware)
app.use("/reservas", reservasRouter)

export default app