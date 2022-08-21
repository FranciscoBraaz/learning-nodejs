import express, { ErrorRequestHandler } from "express"
import dotenv from "dotenv"
import ApiRoutes from "./routes/index"
import cors from "cors"
import path from "path"
import mustache from "mustache-express"
import { mongoConnect } from "./database/mongo"
import { MulterError } from "multer"

dotenv.config()

mongoConnect()

const server = express()
server.set("view engine", "mustache")
server.set("views", path.join(__dirname, "views"))
server.engine("mustache", mustache())

server.use(express.static(path.join(__dirname, "../public")))

server.use(cors())
server.use(express.urlencoded({ extended: true }))

server.use("/api", ApiRoutes)
server.use((req, res) => {
  res.status(404)
  res.json({ message: "Endpoint não encontrado" })
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(400)

  if (err instanceof MulterError) {
    res.json({ error: err.code })
  } else {
    console.log(err)
    res.json({ error: "Houve um erro" })
  }
}
server.use(errorHandler)

server.listen(process.env.PORT)
