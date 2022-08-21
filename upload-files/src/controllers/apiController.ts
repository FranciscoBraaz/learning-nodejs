import { Request, Response } from "express"

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

export function uploadFile(req: Request, res: Response) {
  console.log(req.file)

  res.json({})
}
