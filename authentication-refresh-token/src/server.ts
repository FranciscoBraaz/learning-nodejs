import express, { Request, Response } from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import { mongoConnect } from "./database/mongo"
import routes from "./routes"
import { credentials } from "./middlewares/credentials"

dotenv.config()

mongoConnect()

const server = express()

server.use(credentials)
server.use(cors())
server.use(express.urlencoded({ extended: true }))
server.use(express.json())
server.use(cookieParser())

server.use(routes)

server.use((req, res) => {
  res.status(404).json({ message: "Página não encontrada" })
})

server.listen(process.env.PORT)
