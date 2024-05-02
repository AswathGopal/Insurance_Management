const express = require('express')
const cors = require('cors')
const  LoginRouter = require('./Routes/Login.js') 
const  SigninRouter= require('./Routes/SignIn.js')
const Controller= require('./Routes/Controller.js')
const cookieParser =require("cookie-parser");
const app = express()
const jwt = require('jsonwebtoken')
app.use(cors({
     origin:['http://localhost:5173'],
    methods:['GET','POST','PUT','DELETE'],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/auth',LoginRouter)
app.use('/auth',SigninRouter)
app.use('/auth',Controller)

app.get("/example",(req , res) => {
    res.send("working")
})


app.post('/verify', (req, res)=> {
    const {token} = req.body;
    console.log(token)
    if(token) {
        jwt.verify(token, "jwt_secret_key", (err) => {
            if(err) return res.json({Status: false, Error: "Wrong Token"})
            else return res.json({Status:"ok"})
        })
    } else {
        return res.json({Status: false, Error: "Not autheticated"})
    }
} )
app.listen(8000,()=>{
    console.log("server is running 8000")
})