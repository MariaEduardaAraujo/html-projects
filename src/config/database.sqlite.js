import Database from 'better-sqlite3'

const db = process.env.DATABASE_URL?.replace('file:./', '') ?? 'dev.db'
const database = new Database(db)
database.pragma('foreign_keys = ON')

export default database