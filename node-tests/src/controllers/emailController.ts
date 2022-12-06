import { Request, Response } from "express"
import nodemailer from "nodemailer"

export async function contact(req: Request, res: Response) {
  // Transporter configuration
  let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ebba8d22916bab",
      pass: "6344516d52b72d",
    },
  })

  const { from, subject, html, text } = req.body
  // Message configuration
  let message = {
    from: "Francisco falso <francisco_braaz@hotmail.com>",
    to: "francisco_braaz@hotmail.com",
    replyTo: from,
    subject: subject,
    html: html,
    text: text,
  }

  try {
    // Send message
    let info = await transport.sendMail(message)

    console.log("Info", info)

    res.json({ message: "Enviado" }).status(200)
  } catch (error) {
    console.log("Error", error)

    res.json({ message: "Erro" }).status(400)
  }
}
