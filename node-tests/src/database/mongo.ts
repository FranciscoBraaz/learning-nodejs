import { connect } from "mongoose"
import dotenv from "dotenv"
import db from "./database"

dotenv.config()

export async function mongoConnect() {
  try {
    await connect(db.url)
    if (process.env.NODE_ENV !== "test") {
      console.log("MongoDB conectado com sucesso!")
    }
  } catch (error) {
    console.log("Erro de conexão com MongoDB: ", error)
  }
}
