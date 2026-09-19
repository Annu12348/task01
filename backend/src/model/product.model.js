import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },

    price: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    imageUrl: {
        type: String,
        default: true
    },
},{
    timestamps: true,
})


const productModel = new mongoose.model("product", productSchema);
export default productModel;