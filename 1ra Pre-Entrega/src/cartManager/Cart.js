import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;

    if (fs.existsSync(path)) {
      try {
        let cart = fs.readFileSync(path, "utf-8");
        this.carts = JSON.parse(cart);
      } catch (error) {
        this.carts = [];
        this.saveFile();
      }
    } else {
      this.carts = [];
      this.saveFile();
    }
  }

  async getCarts() {
    return this.carts;
  }

  async saveFile() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.carts, null, "\t")
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async idAutoincremental() {
    const ids = this.carts.map((ele) => ele.id);
    return ids.length > 0 ? Math.max(...ids) : 0;
  }

  async createCart() {
    const newCart = new Cart();
    newCart.id = await this.idAutoincremental() + 1;

    this.carts.push(newCart);
    await this.saveFile();
    return newCart.id;
    console.log(`Nuevo carrito con id ${newCart.id} creado con éxito.`);
  }

  async getCartById(id) {
    const cart = this.carts.find((p) => p.id == id);
    return cart || "Not found";
  }

  async addToCart(cartId, productId) {

    //Buscamos el carro para ver si esta creado o no
    const cart = this.carts.find((c) => c.id == cartId);
    console.log('Hola',cart);

    if (!cart) {
      console.log("Error: Carrito no encontrado.");
      return;
    }
    //Si esta creado buscamos el producto en el carro
    const productIndex = await cart.products.findIndex(
      (p) => p.idProduct == productId
    );
   
    //Si el producto no esta lo agregamos, y si esta le aumentamos la cantidad
    if (productIndex !== -1) {
     
      // Producto ya existe en el carrito, incrementar cantidad
      cart.products[productIndex].quantity++;
    } else {
      // Agregar nuevo producto al carrito
      cart.products.push({ idProduct: productId, quantity: 1 });
    }

    await this.saveFile();
    console.log(`Producto ${productId} agregado al carrito "${cart.id}".`);
  }
}

class Cart {
  constructor() {
    this.id = 0;
    this.products = [];
  }
}


export { CartManager, Cart };
