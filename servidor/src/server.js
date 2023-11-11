import express from "express";
import { ProductManager } from "../src/productManager/ProductManager.js";

const server = express();

const productManager = new ProductManager("./productos.json");

server.get('/products', async (req, res) => {
    try {
        const {limit} = req.query
       if (limit >= 1) {
           const products = await productManager.getProducts();
           const productWithLimit = products.slice(0,limit)
           res.json(productWithLimit);
       }else{
            const products = await productManager.getProducts();
           res.json(products);
       }
       
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

server.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params
        if (id) {
            console.log(id);
            const response = await productManager.getProductById(id)
            res.json(response);
        }
        console.log('Id', response);
    } catch (error) {
        
    }
})

server.listen(8080, () => {
    console.log("Server listening on port 8080");
});
