const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;

    if (fs.existsSync(path)) {
      try {
        let products = fs.readFileSync(path, "utf-8");
        this.products = JSON.parse(products);
      } catch (error) {
        this.products = [];
      }
    } else {
      this.products = [];
    }
  }
  getProducts() {
    return this.products;
  }

  async saveFile() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async addProduct(product) {
    // Generar Codigo
    const code = Math.floor(Math.random() * 900) + 100;
    // Validar que el codigo no se repita
    const codeExists = product.code.find((cod) => cod === code);
    if (!codeExists) {
      // Asignamos el codigo al producto
      product.code.push(code);

      this.products.push(product);

      const respuesta = await this.saveFile(this.products);

      if (respuesta) {
        console.log("Producto agregado");
      } else {
        console.log("Hubo un error al agregar el producto");
      }
    }
  }
  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    return product || "Not found";
  }
  async deleteProduct(id) {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
        this.products.splice(index, 1);
        try {
            await this.saveFile();
            console.log("Producto eliminado");
        } catch (error) {
            console.log("Hubo un error al eliminar el producto");
        }
    }else {
        console.log("Producto no encontrado");
      }
  }

  async updateProduct(id, updateProduct) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updateProduct, id };
      try {
        await this.saveFile();
        console.log("Producto actualizado");
      } catch (error) {
        console.log("Hubo un error al actualizar el producto");
      }
    } else {
      console.log("Producto no encontrado");
    }
  }
}

class Products {
  constructor(title, description, price, thumbnail, stock) {
    this.id = Products.autoIncrementId++; // Id autoincremental
    this.title = title; // (Nombre del producto)
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail; // (ruta de imagen)
    this.code = [];
    this.stock = stock; // (número de piezas disponibles)
  }
}

// Inicializar el ID autoincremental en la clase Products
Products.autoIncrementId = 1;

// -------- Pruebas ---------

//1) Crear productos
const producto1 = new Products(
  "Zapatillas Nike Air Force",
  "Zapatillas comodas color negro",
  125000,
  "Imagen.url",
  25
);
const producto2 = new Products(
  "Zapatillas Adidas",
  "Zapatillas comodas color rojo",
  115000,
  "Imagen.url",
  20
);

const manager = new ProductManager("./productos.json");

console.log(manager.getProducts());

manager.addProduct(producto1);
manager.addProduct(producto2);
console.log(manager.getProducts());

//2)Actualizar Producto
manager.updateProduct(1, {
  title: "Zapatillas Nike Air Force 69",
  description: "Nuevas zapatillas",
  price: 130000,
  thumbnail: "NuevaImagen.url",
  stock: 30,
});

console.log(manager.getProducts());

console.log("Producto traido por Id: ", manager.getProductById(1));

//3)Eliminar Producto
console.log(manager.deleteProduct(1));