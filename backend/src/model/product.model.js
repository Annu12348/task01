import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 150,
    },

    price: {
        type: Number,
        required: true,
        min: 0,
        max: 100000000,
    },

    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 10,
        maxlength: 2000,
    },

    imageUrl: {
        type: String,
        required: true,
        trim: true,
    },

    category: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
        lowercase: true,
    },
}, {
    timestamps: true,
    versionKey: false,
})

productSchema.index({ category: 1 });
productSchema.index({ productName: 1 });

const productModel = new mongoose.model("product", productSchema);
export default productModel;