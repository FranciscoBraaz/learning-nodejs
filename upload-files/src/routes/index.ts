import { Router } from "express"

import * as HomeController from "../controllers/homeController"
import * as InfoController from "../controllers/infoController"
import * as UserController from "../controllers/userController"
import * as ApiController from "../controllers/apiController"

import multer from "multer"

// const storageConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./tmp")
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname)
//   },
// })

const upload = multer({
  dest: "./tmp",
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png"]
    cb(null, allowedTypes.includes(file.mimetype))
  },
  limits: {
    fileSize: 4154450,
  },
})

const router = Router()

router.get("/", HomeController.home)

router.get("/contato", InfoController.contato)
router.get("/sobre", InfoController.sobre)

router.get("/usuario", UserController.getUsers)
router.get("/usuario/:id/addidade", UserController.incrementAge)
router.post("/usuario", UserController.createUser)

router.post(
  "/upload-files",
  upload.fields([
    { name: "signature", maxCount: 1 },
    { name: "prints", maxCount: 3 },
  ]),
  ApiController.uploadFiles,
)
router.post("/upload-file", upload.single("image"), ApiController.uploadFile)

export default router
