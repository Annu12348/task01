import { uploadImage } from "../config/imagekit/storage.imagekit.js";
import mongoProductRepository from "../respositories/implementations/mongoProductRespository.js";
import AppError from "../utils/error.js";

class productService {
    constructor() {
        this.mongoProductRespository = new mongoProductRepository()
    }

    async create(data, file) {
        try {
            if (!file) {
                throw new AppError("Product image is required", 400);
            }

            const { productName, price, description, category } = data;

            const uploadedImage = await uploadImage(
                file.buffer,
                file.originalname
            );

            if (!uploadedImage?.url) {
                throw new AppError("Failed to upload product image", 500);
            }

            const productData = {
                productName,
                price,
                description,
                category,
                imageUrl: uploadedImage.url,
            };

            const product = await this.mongoProductRespository.create(productData)

            if (!product) {
                throw new AppError("Failed to create product", 500);
            }

            return product;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError("Failed to create product", 500, error);
        }
    }

    async findAll(filters = {}) {
        try {
            const products = await this.mongoProductRespository.findAll(filters);

            return products;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError("Failed to fetch products", 500, error);
        }
    }

    async findById(productId) {
        try {
            const product = await this.mongoProductRespository.findById(productId);

            if (!product) {
                throw new AppError("Product not found", 404);
            }

            return product;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError("Failed to fetch product", 500, error);
        }
    }

    async update(productId, data, file) {
        try {
            const existingProduct = await this.mongoProductRespository.findById(productId);

            if (!existingProduct) {
                throw new AppError("Product not found", 404);
            }

            const { productName, price, description, category } = data;

            const updateData = {};

            if (productName !== undefined) {
                updateData.productName = productName;
            }

            if (price !== undefined) {
                updateData.price = price;
            }

            if (description !== undefined) {
                updateData.description = description;
            }

            if (category !== undefined) {
                updateData.category = category
            }

            if (file) {
                const uploadedImage = await uploadImage(
                    file.buffer,
                    file.originalname
                );

                if (!uploadedImage?.url) {
                    throw new AppError("Failed to upload product image", 500);
                }

                updateData.imageUrl = uploadedImage.url;
            }

            const updatedProduct = await this.mongoProductRespository.update(productId, updateData);

            if (!updatedProduct) {
                throw new AppError("Failed to update product", 500);
            }

            return updatedProduct;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError("Failed to update product", 500, error);
        }
    }

    async delete(productId) {
        try {
            const product = await this.mongoProductRespository.delete(productId);

            if (!product) {
                throw new AppError("Product not found", 404);
            }

            return product;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError(
                "Failed to delete product", 500, error
            );
        }
    }
}

export default productService;