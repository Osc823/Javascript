import { Router } from "express";
import { CartManager } from "../cartManager/Cart.js";

const routerCarts = Router();
const cartManager = new CartManager("./carrito.json")

routerCarts.post('/',async(req, res) => {
    await cartManager.createCart();
    res.json({
        message :"Nuevo carrito creado con éxito"
    })
})

routerCarts.get('/:cid', async(req, res) => {
    const {cid} = req.params
    if (cid) {
        const response = await cartManager.getCartById(cid)
        return res.json(response)
    }
    res.json({
        Error :"No Id"
    })
})

routerCarts.post('/:cid/product/:pid', async(req, res) => {
    const {cid, pid} = req.params
    console.log('Loque me llega', cid, pid);
    if (cid) {
        const response = await cartManager.addToCart(cid, pid)
        return res.json(response)
    }
    res.json({
        Error :"No Id"
    })
})

export default routerCarts
