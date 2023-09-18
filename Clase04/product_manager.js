import fs from 'fs';

class ProductManager {

    constructor(path) {
        this.path = path
    };

    async addProducts(title, description, price, thumbnail, code, stock) {
        try {
            const products = await this.getProducts();
            const prodExist = products.find(item => item.code === code);
            if (prodExist) {
                return "El codigo del producto ya existe";
            }
            const product = {
                id: products.length === 0 ? 1 : products[products.length-1].id + 1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return 'Producto agregado correctamente';
        } catch (error) {
            return error
        }
    };

    async getProducts(query) {
        const {limit} = query
        try {
            if (fs.existsSync(this.path)) {
                const productsFile = await fs.promises.readFile(this.path, 'utf-8');
                const productsArray = JSON.parse(productsFile);
                return limit ? productsArray.slice(0,limit) : productsArray
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
            const products = await this.getProducts();
            let confirm = products.find(item => item.id === idProd);
            if(!confirm){
                return 'el ID es inexistente';
            }
            const newProducts = products.filter(item => item.id !== idProd);
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts))
            confirm = products.find(item => item.id === idProd);
            if(confirm){
                return `El producto con el ID: ${idProd} fue borrado correctamente`;
            }
        } catch (error) {
            return error;
        };
    };

    async updateProduct(idProd, field, value) {
        if(field === 'id'){
            return 'No se puede modificar el ID'
        }; 
        try {
            const products = await this.getProducts();
            const indexUpdate = products.findIndex(item => item.id === idProd);
            if (indexUpdate != -1) {
                products[indexUpdate][field] = value;
                await fs.promises.writeFile(this.path, JSON.stringify(products));
                return 'Producto modificado correctamente'
            } else {
                return "No se encontro el producto";
            };
        } catch (error) {
            return error;
        };
    };

};


export const productsManager = new ProductManager('products.json');