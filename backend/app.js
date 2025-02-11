const express = require('express')
const app = express();
const dotenv = require("dotenv")
const cors = require('cors')
dotenv.config()
require("./conn/conn")

const User = require("./routes/user")
const Books = require("./routes/book")
const Favourite = require("./routes/favourite")
const Cart = require("./routes/cart")
const Order = require("./routes/order")

const port = process.env.PORT ;
app.use(cors())
app.use(express.json())

//defining routes
app.use("/api/v1", User)
app.use("/api/v1", Books)
app.use("/api/v1", Favourite)
app.use("/api/v1", Cart)
app.use("/api/v1", Order)

app.listen(3000, ()=> {
    console.log(`server is listening on port ${port}`)
})