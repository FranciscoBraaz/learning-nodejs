import mongoose, { connect } from "mongoose"
import * as UserService from "./UserService"
import User, { UserType } from "../models/User"
import db from "../database/database"
import { dropAllCollections } from "../utils/dropAllCollections"

describe("Testing user service", () => {
  beforeAll(async () => {
    try {
      await connect(db.url)
      // console.log("MongoDB conectado com sucesso!")
    } catch (error) {
      console.log("Erro de conexão com MongoDB: ", error)
    }
  })

  afterAll(async () => {
    await dropAllCollections()
    await mongoose.connection.close()
  })

  let email = "test@gmail.com"
  let password = "123456"

  it("should create a new user", async () => {
    const newUser = await UserService.createUser(email, password)
    expect(newUser).toHaveProperty("_id")
    expect(newUser).toHaveProperty("email")
  })

  it("should not allow to create a user with existing email", async () => {
    try {
      await UserService.createUser(email, password)
    } catch (error) {
      //@ts-ignore
      expect(error.message).toBe("E-mail já cadastrado")
    }
  })

  it("should find user by e-mail", async () => {
    const user = (await UserService.findByEmail(email)) as UserType
    expect(user.email).toBe(email)
  })

  it("should match the received password with the password of database", async () => {
    const user = (await UserService.findByEmail(email)) as UserType
    expect(UserService.matchPassword(password, user.password)).toBeTruthy()
  })

  it("should not match the received password with the password of database", async () => {
    const user = (await UserService.findByEmail(email)) as UserType
    expect(
      UserService.matchPassword("invalidPassword", user.password),
    ).toBeFalsy()
  })

  it("should get all users", async () => {
    await UserService.createUser("teste4@gmail.com", "12323")
    const users = await UserService.getAllUsers()
    expect(users.length).toBeGreaterThanOrEqual(1)
    for (let i in users) {
      expect(users[i]).toBeInstanceOf(User)
    }
  })
})
