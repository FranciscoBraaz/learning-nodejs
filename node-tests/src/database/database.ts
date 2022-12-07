import dotenv from "dotenv"

dotenv.config()

let db = {
  url: process.env.MONGO_URL as string,
}

if (process.env.NODE_ENV === "test") {
  db.url = process.env.MONGO_URL_TEST as string
}

export default db
