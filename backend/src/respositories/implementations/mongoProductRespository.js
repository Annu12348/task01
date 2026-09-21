import productModel from "../../model/product.model.js";
import AppError from "../../utils/error.js";
import IProductRespository from "../contracts/IProductRespository.js";
import mongoose from "mongoose";

class mongoProductRepository extends IProductRespository {
    async create(data) {
        try {
            const product = await productModel.create(data);
            return product;
        } catch (error) {
            throw new AppError(`failed to product create: ${error.messahe}`, 500, error)
        }
    }

    async findAll(filters = {}) {
        try {
            const query = {};

            if (filters.search) {
                query.productName = {
                    $regex: filters.search,
                    $options: "i",
                };
            }

            if (filters.category) {
                query.category = filters.category.toLowerCase();
            }

            const products = await productModel.find(query).sort({ createdAt: -1 }).lean();
            return products;
        } catch (error) {
            throw new AppError("Failed to fetch products", 500, error);
        }
    }

    async findById(productId) {
        try {
            if (!mongoose.isValidObjectId(productId)) {
                throw new AppError("Invalid product ID", 400);
            }

            const product = await productModel.findById(productId).lean();

            return product;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError("Failed to fetch product", 500, error);
        }
    }

    async update(productId, data) {
        try {
            if (!mongoose.isValidObjectId(productId)) {
                throw new AppError("Invalid product productId", 400);
            }

            const product = await productModel.findByIdAndUpdate(
                productId,
                data,
                {
                    new: true,
                    runValidators: true,
                }
            ).lean();

            return product;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError("Failed to update product", 500, error);
        }
    }

    async delete(productId) {
        try {
            if (!mongoose.isValidObjectId(productId)) {
                throw new AppError("Invalid product productId", 400);
            }

            const product = await productModel.findByIdAndDelete(productId).lean();

            return product;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError("Failed to delete product", 500, error);
        }
    }
}

export default mongoProductRepository;