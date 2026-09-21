import imagekit from "imagekit";
import path from "path";
import crypto from "crypto";
import AppError from "../../utils/error.js";
import { config } from "../config.js";

export const Imagekit = new imagekit({
    privateKey: config.IMAGEKIT_PRIVATE_KEY,
    publicKey: config.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: config.IMAGEKIT_ENDPOINT_URL,
});

export const uploadImage = (file, originalName) => {
    if (!file) {
        throw new AppError("Image file is required", 400)
    }

    if (!originalName) {
        throw new AppError("Original image name is required", 400)
    }

    const extension = path.extname(originalName).toLowerCase()
    const fileName = `product-${crypto.randomUUID()}${extension}`

    return new Promise((resolve, reject) => {
        Imagekit.upload({
            file: file,
            fileName,
            folder: "/products"
        }, (error, result) => {
            if (error) {
                return reject(
                    new AppError("Failed to upload image", 500)
                )
            }

            return resolve({
                fileId: result.fileId,
                name: result.name,
                url: result.url,
                thumbnailUrl: result.thumbnailUrl,
                filePath: result.filePath,
            })
        })
    })
}