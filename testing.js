const carts = [
    { "id": 1, "products": [] },
    { "id": 2, "products": [{ id: 1, quantity: 1 }] },
    { "id": 3, "products": [] }
];

const products =
    {
        "id": 1,
        "status": true,
        "title": "Producto - 1",
        "description": "Este es el producto 1",
        "price": 200,
        "thumbnail": "sin imagen",
        "code": "abc123",
        "stock": 25,
        "category": "categoria-1"
    }

let idCart = 2;
let {id} = products

console.log(id);

const indexCart = carts.findIndex(item => item.id === idCart);
if (indexCart != -1) {
    const newCart = carts[indexCart];
    const productsInCart = [...newCart.products]
    const isInCart = productsInCart.some(item => item.id === id)
    if(isInCart){
        prodIndex = productsInCart.findIndex(item => item.id === id)
        productsInCart[prodIndex].quantity += 1
        console.log(newCart.products)
    } else {
        let newProduct = {id, quantity:1}
        newCart.products.push(newProduct)
        console.log(newCart.products)
    }
    console.log(carts)
}

