import {Router} from 'express';
import {cartsManager} from '../carts_manager.js'
import { productsManager } from '../product_manager.js';

const router = Router();

router.get('/:idCart', async (req, res) => {
    const { idCart } = req.params;
    try {
        const cart = await cartsManager.getCartByID(+idCart);
        if (!cart) {
            return res.status(400).json({ message: `Product with id: ${idCart} not found` });
        }
        res.status(200).json({ message: 'Query Successful:', cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const newCart = await cartsManager.addCart(req.body);
        res.status(200).json({ message: 'Cart Created', newCart })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/:idCart/product/:idProd', async (req, res) => {
    const {idCart, idProd} = req.params;
    try {
        const productInfo = await productsManager.getProductByID(+idProd);
        const newProductInCart = await cartsManager.addToCart(+idCart, productInfo)
        if (newProductInCart === -1){
            res.status(404).json({message: 'Cart not Found'})
        }
        res.status(200).json({ message: 'Product Added to Cart', newProductInCart })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


export default router