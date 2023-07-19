const express = require("express")
const cors = require("cors")
const { connection } = require("./connection/db")
const userRouter = require("./routes/auth.Routes")
const inventoryRouter = require("./routes/Inventory.Routes")
const oemSpecsRouter = require("./routes/OemRoutes")


const app = express()
app.use(express.json())
app.use(cors())



app.use("/api/user",userRouter)
app.use("/api/invent",inventoryRouter)
app.use("/api/oem",oemSpecsRouter)

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