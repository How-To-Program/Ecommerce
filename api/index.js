const express = require("express");
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const stripeRoute = require("./routes/stripe")
const cors = require("cors")

dotenv.config()

mongoose
    .connect(
        process.env.MONGO_URL
    )
    .then(()=>console.log('DBConnection successful!'))
    .catch((err)=>{
        console.log(err)
    });

    // app.get("/user/test", ()=>{
    //     console.log("test is sucess")
    // })


// var allowCrossDomain = function (req, res, next) {
//     // 请求源 ajax http://localhost:8080
//     res.header("Access-Control-Allow-Origin", "*");
        
//     // 请求头  x-token 
//     res.header("Access-Control-Allow-Headers", "*");
        
//     // 请求方法  post get put delete patch 
//     res.header("Access-Control-Allow-Methods", "*");
        
//     // 下一步 
//     next();      
// }
        
// app.use(allowCrossDomain);
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(express.json())
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, ()=>{
    console.log("running!")
})