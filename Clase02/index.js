
class ProductManager {
    constructor() {
        this.products = [];
    }

    addProducts(title, description, price, thumbnail, code, stock) {
        const prodExist = this.products.find(item => item.code === code)
        if (prodExist) {
            return "El codigo del producto ya existe";
        }
        const product = {
            id: this.products.length === 0 ? 1 : this.products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(product);
        return "Producto agregado correctamente"
    };

    getProducts() {
        return (this.products);
    }

    getProductByID(idProd) {
        const prodExist = this.products.find(item => item.id === idProd);
        if (prodExist) {
            return prodExist;
        } else {
            return "No se encontro el producto";
        }
    };
    };

let products = new ProductManager();
console.log(products.addProducts("producto prueba", "Este es un producto prueba", 200, "sin imagen", "abc123", 25));
console.log(products.getProducts());
console.log(products.addProducts("producto prueba 2", "Este es un producto prueba 2", 300, "sin imagen", "def456", 35));
console.log(products.getProducts());
console.log(products.addProducts("producto mismo codigo", "Este es un producto prueba", 200, "sin imagen", "abc123", 25));
console.log(products.getProductByID(1));
console.log(products.getProductByID(4));
