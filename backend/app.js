import express from "express"
import cors from "cors"

import postRouter from './routes/post.routes.js'
const app = express()

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))



app.use("/api/v1/posts", postRouter)

export { app }