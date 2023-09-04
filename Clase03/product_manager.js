const fs = require('fs');

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

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const array = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(array);
            } else {
                return [];
            };
        } catch (error) {
            return error
        };
    };


    async getProductByID(idProd) {
        try {
            const products = await this.getProducts();
            const prodExist = products.find(item => item.id === idProd);
            if (prodExist) {
                return prodExist;
            } else {
                return "No se encontro el producto";
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


async function tests() {
    const products = new ProductManager('products.json');
    let response = await products.getProducts();
    console.log(response);

    response = await products.addProducts("producto prueba", "Este es un producto prueba", 200, "sin imagen", "abc123", 25);
    response = await products.addProducts("producto prueba 2", "Este es un producto prueba 2", 300, "sin imagen", "def456", 35);
    response = await products.addProducts("producto prueba 3", "Este es un producto prueba 3", 100, "sin imagen", "ghi789", 45);
    console.log(response);
    
    response = await products.getProducts();
    console.log(response);
    
    response = await products.getProductByID(1);
    console.log(response);
    
    response = await products.getProductByID(3);
    console.log(response);
    
    response = await products.updateProduct(1, 'id', 4)
    console.log(response);
    
    response = await products.updateProduct(1, 'title', 'Titulo Modificado');
    console.log(response);

    response = await products.getProducts();
    console.log(response);
    
    response = await products.deleteProduct(2);
    console.log(response);
    
    response = await products.addProducts("producto prueba 4", "Este es un producto prueba 4", 100, "sin imagen", "jkl101", 55);
    console.log(response);

    response = await products.getProducts();
    console.log(response);

    response = await products.deleteProduct(8);
    console.log(response);
}

tests();