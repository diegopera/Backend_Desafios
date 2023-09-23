import fs from 'fs';

class CartsManager {

    constructor(path) {
        this.path = path
    };

    async addCart(obj) {
        try {
            const carts = await this.getCarts();
            let id = carts.length === 0 ? 1 : carts[carts.length - 1].id + 1;
            // let products = [];
            const cart = { id, ...obj }
            carts.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return cart;
        } catch (error) {
            return error
        }
    };

    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const cartsFile = await fs.promises.readFile(this.path, 'utf-8');
                const cartsArray = JSON.parse(cartsFile);
                return cartsArray;
            } else {
                return [];
            };
        } catch (error) {
            return error
        };
    };

    async getCartByID(idCart) {
        try {
            const carts = await this.getCarts();
            const cartExist = carts.find(item => item.id === idCart);
            if (cartExist) {
                return cartExist;
            } else {
                return "Cart Not Found";
            };
        } catch (error) {
            return error;
        };
    };

    async addToCart(idCart, product) {
        const { id } = product;
        try {
            const carts = await this.getCarts();
            const indexCart = carts.findIndex(item => item.id === idCart);
            if (indexCart != -1) {
                const newCart = carts[indexCart];
                const productsInCart = [...newCart.products]
                const isInCart = productsInCart.some(item => item.id === id)
                if(isInCart){
                    const prodIndex = productsInCart.findIndex(item => item.id === id)
                    productsInCart[prodIndex].quantity += 1
                    await fs.promises.writeFile(this.path, JSON.stringify(carts));
                    return newCart
                } else {
                    let newProduct = {id, quantity:1}
                    newCart.products.push(newProduct)
                    await fs.promises.writeFile(this.path, JSON.stringify(carts));
                    return newCart
                }
            } else {
                return -1
            }
        } catch (error) {
            return error;
        }
    }

    // async deleteProduct(idProd) {
    //     try {
    //         const products = await this.getProducts({});
    //         let confirm = products.find(item => item.id === idProd);
    //         if (!confirm) {
    //             return -1;
    //         }
    //         const newProducts = products.filter(item => item.id !== idProd);
    //         await fs.promises.writeFile(this.path, JSON.stringify(newProducts))
    //         confirm = products.find(item => item.id === idProd);
    //         if (confirm) {
    //             return 1;
    //         }
    //     } catch (error) {
    //         return error;
    //     };
    // };

    // async updateProduct(idProd, obj) {
    //     try {
    //         const products = await this.getProducts({});
    //         const indexUpdate = products.findIndex(item => item.id === idProd);
    //         if (indexUpdate != -1) {
    //             const newProd = products[indexUpdate];
    //             products[indexUpdate] = { ...newProd, ...obj };
    //             await fs.promises.writeFile(this.path, JSON.stringify(products));
    //             return 1;
    //         } else {
    //             return -1;
    //         };
    //     } catch (error) {
    //         return error;
    //     };
    // };

};


export const cartsManager = new CartsManager('carts.json');