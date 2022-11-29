import { NextFunction, Request, Response } from "express"

export function credentials(req: Request, res: Response, next: NextFunction) {
  res.setHeader("Access-Control-Allow-Credentials", "true")
  next()
}
