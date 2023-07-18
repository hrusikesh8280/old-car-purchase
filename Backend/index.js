const express = require("express")
const cors = require("cors")
const { connection } = require("./connection/db")

const app = express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.listen(9009,async()=>{
    try{
        await connection
        console.log("Server Connected to the Mongoose");
    }catch(err){
        console.log(err);
    }
    console.log("Server is Running at 9009");
})