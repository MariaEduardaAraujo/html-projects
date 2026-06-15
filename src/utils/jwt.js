import jwt from 'jsonwebtoken'

const SECRET         = process.env.JWT_SECRET
const EXPIRES_IN     = process.env.JWT_EXPIRES_IN
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
const REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES_IN || '7d'

export function gerarAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
}

export function gerarRefreshToken(payload) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' })
}

export function verificarAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}

export function verificarRefreshToken(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
}