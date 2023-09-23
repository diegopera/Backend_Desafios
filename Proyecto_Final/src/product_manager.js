import fs from 'fs';

class ProductManager {

    constructor(path) {
        this.path = path
    };

    async addProducts(obj) {
        const {code} = obj
        try {
            const products = await this.getProducts({});
            let status = true;
            let id = products.length === 0 ? 1 : products[products.length - 1].id + 1;
            let prodExist = products.find(item => item.code === code);
            if (prodExist) {
                return "Product Code Already Exists";
            }
            const product = { id, status, ...obj }
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return product;
        } catch (error) {
            return error
        }
    };

    async getProducts(query) {
        const { limit } = query
        try {
            if (fs.existsSync(this.path)) {
                const productsFile = await fs.promises.readFile(this.path, 'utf-8');
                const productsArray = JSON.parse(productsFile);
                return limit ? productsArray.slice(0, limit) : productsArray
            } else {
                return [];
            };
        } catch (error) {
            return error
        };
    };

    async getProductByID(idProd) {
        try {
            const products = await this.getProducts({});
            const prodExist = products.find(item => item.id === idProd);
            if (prodExist) {
                return prodExist;
            } else {
                return "Product Not Found";
            };
        } catch (error) {
            return error;
        };
    };

    async deleteProduct(idProd) {
        try {
            const products = await this.getProducts({});
            let confirm = products.find(item => item.id === idProd);
            if (!confirm) {
                return -1;
            }
            const newProducts = products.filter(item => item.id !== idProd);
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts))
            confirm = products.find(item => item.id === idProd);
            if (confirm) {
                return 1;
            }
        } catch (error) {
            return error;
        };
    };

    async updateProduct(idProd, obj) {
        try {
            const products = await this.getProducts({});
            const indexUpdate = products.findIndex(item => item.id === idProd);
            if (indexUpdate != -1) {
                const newProd = products[indexUpdate];
                products[indexUpdate] = {...newProd, ...obj};
                await fs.promises.writeFile(this.path, JSON.stringify(products));
                return 1;
            } else {
                return -1;
            };
        } catch (error) {
            return error;
        };
    };

};


export const productsManager = new ProductManager('products.json');