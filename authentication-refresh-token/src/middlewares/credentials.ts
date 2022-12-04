import { NextFunction, Request, Response } from "express"

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:2000",
  "http://127.0.0.1:5500",
]

export function credentials(req: Request, res: Response, next: NextFunction) {
  const origin = req.headers.origin
  if (origin && allowedOrigins.includes(origin)) {
    //@ts-ignore
    res.setHeader("Access-Control-Allow-Credentials", "true")
  }
  next()
}
