import mongoose, { connect } from "mongoose"
import request from "supertest"
import app from "../app"
import { dropAllCollections } from "../utils/dropAllCollections"
import db from "../database/database"

describe("Testing api routes", () => {
  const email = "test@gmail.com"
  const password = "123456"

  beforeAll(async () => {
    try {
      await connect(db.url)
    } catch (error) {
      console.log("Erro de conexão com MongoDB: ", error)
    }
  })

  afterAll(async () => {
    await dropAllCollections()
    await mongoose.connection.close()
  })

  it("should show welcome message", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.body.message).toBe("Bem vindo")
        return done()
      })
  })

  it("should register an user", (done) => {
    request(app)
      .post("/cadastro")
      .send(`email=${email}&password=${password}`)
      .then((response) => {
        expect(response.body.message).toBeUndefined()
        expect(response.body).toHaveProperty("user")
        return done()
      })
  })

  it("should not allow to create a user with existing email", (done) => {
    request(app)
      .post("/cadastro")
      .send(`email=${email}&password=${password}`)
      .then((response) => {
        expect(response.body.message).toBe("E-mail já cadastrado")
        return done()
      })
  })

  it("should allow login", (done) => {
    request(app)
      .post("/login")
      .send(`email=${email}&password=${password}`)
      .then((response) => {
        expect(response.body.message).toBeUndefined()
        expect(response.body).toHaveProperty("user")
        expect(response.body).toHaveProperty("token")
        return done()
      })
  })

  it("should not allow login when missing email", (done) => {
    request(app)
      .post("/login")
      .send(`password=${password}`)
      .then((response) => {
        expect(response.body.message).toBe("Dados incompletos")
        return done()
      })
  })

  it("should not allow login when missing password", (done) => {
    request(app)
      .post("/login")
      .send(`email=${email}`)
      .then((response) => {
        expect(response.body.message).toBe("Dados incompletos")
        return done()
      })
  })

  it("should not allow login when password is wrong", (done) => {
    request(app)
      .post("/login")
      .send(`email=${email}&password=${"wrong"}`)
      .then((response) => {
        expect(response.body.message).toBe("Email ou senha incorretos")
        return done()
      })
  })

  it("should not allow login when email is wrong", (done) => {
    request(app)
      .post("/login")
      .send(`email=${"wrong"}&password=${password}`)
      .then((response) => {
        expect(response.body.message).toBe("Email ou senha incorretos")
        return done()
      })
  })
})
