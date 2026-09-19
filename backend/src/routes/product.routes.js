import express from "express";
const router = express.Router();

router.post("/create", async (req, res, next) => {
    try {
        const product = await productModel.create(req,body)

        res.status(201).json({
            message: "product created successfully",
            data: product
        })
    } catch (error) {
        next(error)
    }
})

export default router;