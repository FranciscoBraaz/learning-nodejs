import { Router } from "express"
import * as Api from "../controllers/apiController"

const router = Router()

router.get("/", (req, res) => {
  res.json({ message: "Bem vindo" })
})

router.get("/list", Api.list)

export default router
