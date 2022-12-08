import mongoose from "mongoose"

export async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    try {
      await collection.drop()
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      //@ts-ignore
      if (error.message === "ns not found") return
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      //@ts-ignore
      if (error.message.includes("a background operation is currently running"))
        return
      //@ts-ignore
      console.log(error.message)
    }
  }
}
