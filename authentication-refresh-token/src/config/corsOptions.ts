const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:2000",
  "http://127.0.0.1:5500",
]

const corsOptions = {
  //@ts-ignore
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      console.log("AllowOrigin", origin)
      callback(null, true)
    } else {
      callback(new Error("Not allowed by Cors"))
    }
  },
  optionsSuccessStatus: 200,
}

export default corsOptions
