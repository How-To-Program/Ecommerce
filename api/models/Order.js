const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true},
        username: {type: String, required: true},
        products: [
            {
                productId: { type: String },
                quantity: {
                    type: Number,
                    default: 1,
                },
                title: {type: String, required: true},
                img: {type: String, required: true},
                price: {type: Number, required: true},
                size: {type: String},
                color: {type: String},
                time: {type: Number, required: true}
            }
        ],
        amount: {type: Number, required: true},
        address: {type: Object, required: true},
        status: {type: String, default:"pending"},
        time: {type: Number, required: true}
    },
    { timestamps: true}
)

module.exports = mongoose.model("Order", OrderSchema)