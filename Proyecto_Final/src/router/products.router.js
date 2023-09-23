import {Router} from 'express'
import { productsManager } from '../product_manager.js';
import { upload } from '../middleware/multer.middleware.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const products = await productsManager.getProducts(req.query);
        if (!products.length) {
            return res.status(200).json({ message: 'No Products Found' });
        }
        res.status(200).json({ message: 'Query Successful: ', products });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get('/:idProd', async (req, res) => {
    const { idProd } = req.params;
    try {
        const product = await productsManager.getProductByID(+idProd);
        if (!product) {
            return res.status(400).json({ message: `Product with id: ${idProd} not found` });
        }
        res.status(200).json({ message: 'Query Successful:', product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/', async (req, res) => {
    const {title, description, code, price, stock, category } = req.body;
    console.log(req.body);
    if (!title || !description || !code || !price || !stock || !category){
        return res.status(400).json({message: 'Missing Mandatory Data'});
    }
    try {
        const newProduct = await productsManager.addProducts(req.body);
        res.status(200).json({ message: 'Product Created', newProduct })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete('/:idProd', async (req, res) => {
    const { idProd } = req.params;
    try {
        const product = await productsManager.deleteProduct(+idProd);
        if (product === -1) {
            return res.status(400).json({ message: `Product with id: ${idProd} not found` });
        }
        res.status(200).json({ message: 'Product Deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.put('/:idProd', async (req, res) => {
    const { idProd } = req.params;
    try {
        const product = await productsManager.updateProduct(+idProd, req.body);
        if (product === -1) {
            return res.status(400).json({ message: `Product with id: ${idProd} not found` });
        }
        res.status(200).json({ message: 'Product Modified' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router