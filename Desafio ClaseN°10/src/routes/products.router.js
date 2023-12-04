import { Router } from "express";
import { ProductManager, Products } from "../productManager/ProductManager.js";


const routerProducts = Router();
const productManager = new ProductManager("./products.json");

routerProducts.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    if (limit >= 1) {
      const products = await productManager.getProducts();
      const productWithLimit = products.slice(0, limit);
      res.json(productWithLimit);
    } else {
      const products = await productManager.getProducts();
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

routerProducts.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    if (pid) {
      const response = await productManager.getProductById(pid);
      res.json(response);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

routerProducts.post("/", async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock } = req.body;
    if (title && description && price  && code && stock) {
        const newProduct = new Products(
            title, 
            description, 
            price, 
            thumbnail, 
            code, 
            stock
        )
        await productManager.addProduct(newProduct);
        res.json({message: `Creado con exito`});
      } else {
        res.status(400).json({ error: "Todos los campos son obligatorios." });
      }
  } catch (error) {}
});

routerProducts.put('/:pid', async (req, res) => {
    try {
      const { pid } = req.params;
      
      // Verificar si se proporciona un ID válido
      if (!pid) {
        return res.status(400).json({ success: false, message: "Se requiere proporcionar un ID de producto válido." });
      }
  
      // Obtener el resultado de la actualización
      const result = await productManager.updateProduct(pid, req.body);
  
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error interno del servidor." });
    }
});

routerProducts.delete("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    if (pid) {
      console.log('Numero que me llega', pid);
      const response = await productManager.deleteProduct(pid);
      res.json(response);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});



export default routerProducts;
