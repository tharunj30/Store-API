require('dotenv').config()
require('express-async-errors')


const express = require("express")
const app = express();

const connectDb = require('./db/connect') 
const productRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')


// middleware
app.use(express.json())


// routes

app.get('/',(req,res)=>{
    res.send('<h1>Store api</h1> <a href= "/api/v1/products">prodcts route</a>')
})

app.use('/api/v1/products',productRouter)

// products route

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000

const start = async()=>{
    try{
        // connectDB
        await connectDb(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening in ${port}....`))         
    }catch(error){
       console.log(error)
    }
}

start()