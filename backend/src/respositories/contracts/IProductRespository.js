class IProductRespository {
    async create(data) {
        throw new Error("method not implement")
    }

    async findAll(filter) {
        throw new Error("method not implement")
    }

    async findById(productId) {
        throw new Error("method not implement")
    }

    async update(productId, data) {
        throw new Error("method not implement")
    }

    async deleteBy(productId) {
        throw new Error("Method not implemented");
    }
}

export default IProductRespository;