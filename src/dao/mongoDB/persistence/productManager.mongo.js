import Product from "../models/product.models.js";

class ProductManager {

    getAll = async (filter, options) => {
        try {
            const data = await Product.paginate(filter, options);
            if(data.docs.length === 0) return {};

            const query = Object.keys(filter).length === 0 ? null : filter;
            const sort = Object.keys(options.sort).length === 0 ? null : options.sort;
             
            const response = {
                status: 'success',
                payload: data.docs,
                totalPages: data.totalPages,
                prevPage: data.prevPage,
                nextPage: data.nextPage,
                page: data.page,
                hasPrevPage: data.hasPrevPage,
                hasNextPage: data.hasNextPage,
                prevLink: `?query=${query}&sort=${sort}&limit=${options.limit}&page=${data.prevPage}`,
                nextLink: `?query=${query}&sort=${sort}&limit=${options.limit}&page=${data.nextPage}`
            };
            
            return response
        } catch(error) {
            throw error;
        }
    };

    getById =  async (pid) => {
        try {
            const data = await Product.findById(pid);
            return data? data : {};
        } catch(error) {
            throw error;
        }
    };

    getByQuery = async (query) => {
        try {
            const data = await Product.find(query);
            return data? data : {};
        } catch(error) {
            throw error;
        }
    };

    create = async (productInfo) => {
        try {
            const data = await Product.create(productInfo);
            return data;      
        } catch(error) {
            throw error;
        }
    };

    update = async (pid, updates) => {
        try {
            const data = await Product.findByIdAndUpdate(pid, updates);
            return data;      
        } catch(error) {
            throw error;
        }
    };

    delete = async (pid) => {
        try {
            const data = await Product.findByIdAndDelete(pid);
            return data;
        } catch(error) {
            throw error;
        }
    };

    deleteAll = async () => {
        try {
            await Product.deleteMany();
            return 'Todos los productos fueron eliminados de la base de datos';
        } catch(error) {
            throw error;
        }
    };
};

export default ProductManager;