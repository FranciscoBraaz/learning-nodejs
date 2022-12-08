import express, { Request, Response } from "express"
import dotenv from "dotenv"
import { mongoConnect } from "./database/mongo"
import routes from "./routes"

dotenv.config()

mongoConnect()

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.json())

server.use(routes)

server.use((req, res) => {
  res.status(404).json({ message: "Página não encontrada" })
})

export default server
