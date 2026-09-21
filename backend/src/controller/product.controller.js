import productService from "../services/product.service.js";

class productController {
    constructor() {
        this.productServices = new productService()
    }

    async create(req, res, next) {
        try {
            const product = await this.productServices.create(
                req.body,
                req.file
            );

            res.status(201).json({
                success: true,
                message: "Product created successfully",
                data: product,
            });
        } catch (error) {
            next(error)
        }
    }

    async findAll(req, res, next) {
        try {
            const products = await this.productServices.findAll(req.query);

            return res.status(200).json({
                success: true,
                message: "Products fetched successfully",
                length: products.length,
                data: products,
            });
        } catch (error) {
            next(error);
        }
    };

    async findById(req, res, next) {
        try {
            const product = await this.productServices.findById(req.params.productId);

            return res.status(200).json({
                success: true,
                message: "Product fetched successfully",
                data: product,
            });
        } catch (error) {
            next(error);
        }
    };

    async update(req, res, next) {
        try {
            const product = await this.productServices.update(
                req.params.productId,
                req.body,
                req.file
            );

            return res.status(200).json({
                success: true,
                message: "Product updated successfully",
                data: product,
            });
        } catch (error) {
            next(error);
        }
    };

    async delete(req, res, next) {
        try {
            const product = await this.productServices.delete(req.params.productId);

            return res.status(200).json({
                success: true,
                message: "Product deleted successfully",
                data: product,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default productController;