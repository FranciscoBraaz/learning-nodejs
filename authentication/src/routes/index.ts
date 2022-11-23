import { Router } from "express"
import * as Api from "../controllers/apiController"
import { Auth } from "../middlewares/auth"

const router = Router()

router.get("/", (req, res) => {
  res.json({ message: "Bem vindo" })
})

router.get("/list", Auth.private, Api.list)

export default router
