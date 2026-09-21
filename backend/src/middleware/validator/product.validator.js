import { body, query } from "express-validator"

export const createProductValidation = [
    body("productName")
        .trim()
        .notEmpty()
        .withMessage("Product name is required")
        .isString()
        .withMessage("Product name must be a string")
        .isLength({ min: 2, max: 150 })
        .withMessage(
            "Product name must be between 2 and 150 characters"
        ),

    body("price")
        .exists()
        .withMessage("Price is required")
        .bail()
        .isFloat({ min: 0 })
        .withMessage("Price must be a valid positive number")
        .toFloat(),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .isString()
        .withMessage("Description must be between 10 and 2000 characters")
        .isLength({ min: 10, max: 2000 })
        .withMessage(
            "Description must be between 10 and 2000 characters"
        ),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required")
        .isString()
        .withMessage("Category must be a string")
        .isLength({ min: 2, max: 100 })
        .withMessage(
            "Category must be between 2 and 100 characters"
        ),
]

export const updateProductValidation = [
    body("productName")
        .optional()
        .trim()
        .isString()
        .withMessage("Product name must be a string")
        .isLength({ min: 2, max: 150 })
        .withMessage(
            "Product name must be between 2 and 150 characters"
        ),

    body("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Price must be a valid positive number")
        .toFloat(),

    body("description")
        .optional()
        .trim()
        .isString()
        .withMessage("Description must be a string")
        .isLength({ min: 10, max: 2000 })
        .withMessage(
            "Description must be between 10 and 2000 characters"
        ),

    body("category")
        .optional()
        .trim()
        .isString()
        .withMessage("Category must be a string")
        .isLength({ min: 2, max: 100 })
        .withMessage(
            "Category must be between 2 and 100 characters"
        ),
];

export const getProductsValidation = [
    query("search")
        .optional()
        .trim()
        .isString()
        .withMessage("Search must be a string")
        .isLength({ min: 1, max: 100 })
        .withMessage(
            "Search must be between 1 and 100 characters"
        ),

    query("category")
        .optional()
        .trim()
        .isString()
        .withMessage("Category must be a string")
        .isLength({ min: 2, max: 100 })
        .withMessage(
            "Category must be between 2 and 100 characters"
        ),
];