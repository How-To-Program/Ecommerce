const Order = require("../models/Order")
const {verifyToken, verifyTokenAuthorization, verifyTokenAdmin} = require("./verifyToken")
const CryptoJS = require("crypto-js")
const router = require("express").Router()

//CREATE
router.post("/", verifyToken, async (req, res)=>{
    const newOrder = new Order(req.body)
    try{
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder)
    } catch(err){
        res.status(500).json(err)
    }
})

//UPDATE
router.put("/:id",verifyTokenAdmin, async (req, res)=>{
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body.order
        }, {new: true})
        res.status(200).json(updatedOrder)
    } catch(err){
        res.status(500).json(err)
    }
})

//DELETE
router.delete("/:id", verifyTokenAdmin, async (req, res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted...")
    } catch(err){
        res.status(500).json(err)
    }
})

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAuthorization, async (req, res)=>{
    try{
        const orders = await Order.find({userId: req.params.userId})
        res.status(200).json(orders)
    } catch(err){
        res.status(500).json(err)
    }
})

//GET ALL
router.get("/all", verifyTokenAdmin, async (req, res)=>{
    try{
        const orders = await Order.find()

        res.status(200).json(orders)
    } catch(err){
        res.status(500).json(err)
    }
})

//GET ONE
router.get("/:orderId", verifyTokenAuthorization, async (req, res)=>{
    try{
        const orders = await Order.findOne({orderId: req.params._id})

        res.status(200).json(orders)
    } catch(err){
        res.status(500).json(err)
    }
})

//STATS: GET MONTHLY INCOME
router.get("/income/all", verifyTokenAdmin, async (req, res)=>{
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))
    try {
        const income = await Order.aggregate([
            {$match: {createdAt: {$gte: prevMonth}}},
            {
                $project: {
                    month: {$month: "$createdAt"},
                    sales: "$amount",
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"}
                }
            }
        ])
        res.status(200).json(income)
    } catch (err) {
        res.status(500).json
    }
})

//STATS: GET MONTHLY PRODUCT
router.get("/income/:productId", verifyTokenAdmin, async (req, res)=>{
    const productId = req.params.productId
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))
    try {
        const income = await Order.aggregate([
            {$match: {createdAt: {$gte: prevMonth}, ...{
                products: { $elemMatch: {productId}}
            }}},
            {
                $project: {
                    month: {$month: "$createdAt"},
                    sales: "$amount",
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"}
                }
            }
        ])
        res.status(200).json(income)
    } catch (err) {
        res.status(500).json
    }
})


module.exports = router