import express from 'express'

export function startExpress(): string {
  const api = express()

  api.use(express.json())

  api.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    next()
  })

  api.use((req, _res, next) => {
    console.log(req.method, req.path)
    next()
  })

  api.get('/', (_req, res) => {
    res.json({ message: 'Hello from express app!' })
  })

  const server = api.listen(0, () => {
    console.log(`Example app started`)
  })

  const { port } = server.address()
  return `http://127.0.0.1:${port}`
}
