import express, { ErrorRequestHandler, Request, Response } from "express"
import dotenv from "dotenv"
import passport from "passport"
import { mongoConnect } from "./database/mongo"
import routes from "./routes"

dotenv.config()

mongoConnect()

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.json())

server.use(passport.initialize())

server.use(routes)

server.use((req, res) => {
  res.status(404).json({ message: "Página não encontrada" })
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err)
  if (err.status) {
    res.status(err.status).json({ error: err.message })
  } else {
    res.status(400).json({ error: "Ocorreu um erro" })
  }
}

server.use(errorHandler)

server.listen(process.env.PORT)
