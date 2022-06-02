const mongoose = require("mongoose")

const CheckoutSchema = new mongoose.Schema(
    {
        quantity: {type: Number, default: 0},
        total: {type: Number, default: 0}
    },
    { timestamps: true}
)

module.exports = mongoose.model("Checkout", CheckoutSchema)