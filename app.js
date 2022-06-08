const express = require("express")

const path = require("path")

const app = express()

app.use ("/static", express.static("/public"))

app.listen (3001, ()=>{console.log("servidor escuchando puerto 3001")})

app.get ("/", (req,res) =>{
    res.sendFile (__dirname + "/views/index.html")
})