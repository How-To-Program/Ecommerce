const Cart = require("../models/Cart")
const {verifyToken, verifyTokenAuthorization, verifyTokenAdmin} = require("./verifyToken")
const CryptoJS = require("crypto-js")
const router = require("express").Router()

//CREATE完成
router.post("/", verifyTokenAuthorization, async (req, res)=>{
    const newCart = new Cart(req.body)
    try{
        const savedCart = await newCart.save();
        res.status(201).json(savedCart)
    } catch(err){
        res.status(500).json(err)
    }
})

//ADD
// router.post("/:id",verifyTokenAuthorization, async (req, res)=>{
//     try{
//         const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
//             $set: req.body
//         }, {new: true})
//         res.status(200).json(updatedCart)
//     } catch(err){
//         res.status(500).json(err)
//     }
// })

//UPDATE
router.put("/:id",verifyTokenAuthorization, async (req, res)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json(updatedCart)
    } catch(err){
        res.status(500).json(err)
    }
})

//DELETE
router.delete("/:id", verifyTokenAuthorization, async (req, res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id, req.params.size, req.params.color)
        // res.status(200).json("Cart has been deleted...")
        res.status(200).json(req.params)
    } catch(err){
        res.status(500).json(err)
    }
})

//GET USER CART完成
router.get("/:userId", verifyTokenAuthorization, async (req, res)=>{
    try{
        const cart = await Cart.find({userId: req.params.userId})
        res.status(200).json(cart)
    } catch(err){
        res.status(500).json(err)
    }
})

//GET ALL
router.get("/all", verifyTokenAdmin, async (req, res)=>{
    try{
        const carts = await Cart.find()

        res.status(200).json(carts)
    } catch(err){
        res.status(500).json(err)
    }
})


module.exports = router