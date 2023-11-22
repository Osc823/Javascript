import { Router } from "express";
import routerProducts from "./products.router.js";
import routerCarts from "./carts.router.js";

const router = Router();

router.use('/api/products', routerProducts)
router.use('/api/carts', routerCarts)


export default router;