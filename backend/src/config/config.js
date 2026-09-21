import dotenv from 'dotenv'
dotenv.config();

export const config = {
    PORT: process.env.PORT,

    MONGODB_URL: process.env.MONGODB_URL,

    JWT_ACCESS_SECRET_KEY: process.env.JWT_ACCESS_SECRET_KEY,
    JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,

    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    IMAGEKIT_ENDPOINT_URL: process.env.IMAGEKIT_ENDPOINT_URL,
}
