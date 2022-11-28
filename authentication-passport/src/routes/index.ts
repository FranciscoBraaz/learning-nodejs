import { Router } from "express"
import * as Api from "../controllers/apiController"
import * as EmailController from "../controllers/emailController"
import { Auth } from "../middlewares/auth"
import { privateRoute } from "../config/passport"
import { ensureAuth } from "../config/passportJwt"

const router = Router()

router.get("/", (req, res) => {
  res.json({ message: "Bem vindo" })
})

router.post("/login", Api.login)
router.get("/list", ensureAuth, Api.list)
router.post("/contato", EmailController.contact)

export default router
