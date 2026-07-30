import { Database } from "../database/database.js"
import { EntregasRepository } from "../repositories/entregas.repository.js"
import { MotoristasRepository } from "../repositories/motoristas.repository.js"
import { EntregasService } from "../services/entregas.service.js"
import { MotoristasService } from "../services/motoristas.service.js"
import { EntregasController } from "../controllers/entregas.controller.js"
import { MotoristasController } from "../controllers/motoristas.controller.js"

const database = new Database()

const entregasRepository = new EntregasRepository(database)
const motoristasRepository = new MotoristasRepository(database)
const entregasService = new EntregasService(entregasRepository, motoristasRepository)
const motoristasService = new MotoristasService(motoristasRepository, entregasRepository)
const entregasController = new EntregasController(entregasService)
const motoristasController = new MotoristasController(motoristasService)

export { entregasController, motoristasController }
