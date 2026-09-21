import express from "express";
import productController from "../controller/product.controller.js";
import { createProductValidation, getProductsValidation, updateProductValidation } from "../middleware/validator/product.validator.js";
import { errorValidator } from "../middleware/error.validator.js";
import upload from "../middleware/upload.middleware.js";
import { authenticationUser } from "../middleware/auth.middleware.js";
const router = express.Router();

const productControllers = new productController()

router.post(
    "/create",
    authenticationUser,
    upload.single("image"),
    createProductValidation,
    errorValidator,
    productControllers.create.bind(productControllers)
)

router.get(
    "/read",
    authenticationUser,
    productControllers.findAll.bind(productControllers)
)

router.get(
    "/:productId",
    authenticationUser,
    getProductsValidation,
    errorValidator,
    productControllers.findById.bind(productControllers)
)

router.put(
    "/update/:productId",
    authenticationUser,
    upload.single("image"),
    updateProductValidation,
    errorValidator,
    productControllers.update.bind(productControllers)
);

router.delete(
    "/delete/:productId",
    authenticationUser,
    productControllers.delete.bind(productControllers)
);

export default router;