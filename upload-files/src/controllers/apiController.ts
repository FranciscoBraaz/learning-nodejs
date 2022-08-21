import { Request, Response } from "express"
import { unlink } from "fs/promises"
import sharp from "sharp"

export function uploadFiles(req: Request, res: Response) {
  // const files = req.files as { [fieldname: string]: Express.Multer.File[] }
  type uploadTypes = {
    signature: Express.Multer.File[]
    prints: Express.Multer.File[]
  }

  const files = req.files as uploadTypes
  console.log("Signature", files.signature)
  console.log("Prints", files.prints)

  res.json({})
}

export async function uploadFile(req: Request, res: Response) {
  if (!req.file) {
    res.json({ error: "Houve um problema no envio do arquivo" }).status(400)
    return
  }
  console.log(req.file)
  const filename = `${req.file.filename}.jpg`
  await sharp(req.file.path)
    .resize(300, 400, {
      position: "top",
      fit: "cover",
    })
    .grayscale()
    .toFormat("jpeg")
    .toFile(`./public/media/${filename}`)

  await unlink(req.file.path)

  res.json({})
}
