import { Router } from "express"
import * as Api from "../controllers/apiController"
import * as EmailController from "../controllers/emailController"
import * as RefreshTokenController from "../controllers/refreshTokenController"
import { Auth } from "../middlewares/auth"

const router = Router()

router.get("/", (req, res) => {
  res.json({ message: "Bem vindo" })
})

router.post("/login", Api.login)
router.get("/list", Auth.private, Api.list)
router.post("/contato", EmailController.contact)
router.get("/refresh", RefreshTokenController.handleRefreshToken)

export default router
