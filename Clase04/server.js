import express from 'express'
import { productsManager } from './product_manager.js';

const app = express();

app.get('/products', async (req, res) => {
    try {
        const products = await productsManager.getProducts(req.query);
        if (!products.length) {
            return res.status(200).json({message: 'No Products Found'});
        }
        res.status(200).json({message: 'Query Successful: ', products});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

app.get('/products/:idProd', async (req, res) => {
const {idProd} = req.params;
try {
    const product = await productsManager.getProductByID(+idProd);
    if(!product){
        return res.status(400).json({message: `Product with id: ${idProd} not found`});
    }
    res.status(200).json({message: 'Query Successful:', product});
} catch (error) {
    res.status(500).json({message: error.message});
}
})

app.listen(8080, () => {
    console.log('nodemon en 8080');
})