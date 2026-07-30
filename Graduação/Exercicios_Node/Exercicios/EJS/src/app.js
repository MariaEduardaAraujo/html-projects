import express from "express"
import { fileURLToPath } from 'url';
import { dirname, join }  from 'path';
import { errorMiddleware } from "./middlewares/error.middleware.js"

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()

app.set('view engine', 'ejs')
app.set('views', join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(join(__dirname, '..', 'public')))
app.use(router)
app.use(errorMiddleware)

export default app