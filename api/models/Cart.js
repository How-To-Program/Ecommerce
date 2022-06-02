const mongoose = require("mongoose")

const CartSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true},
        products: [
            {
                productId: {type: String},
                title: {type: String, required: true},
                desc: {type: String, required: true},
                img: {type: String, required: true},
                price: {type: Number, required: true},
                quantity: {
                    type: Number,
                    default: 1,
                },
                size: {type: String,},
                color: {type: String,}
            }
        ],
    },
    { timestamps: true}
)

module.exports = mongoose.model("Cart", CartSchema)