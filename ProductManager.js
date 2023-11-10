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
        this.saveFile(); 
      }
    } else {
      this.products = [];
      this.saveFile(); 
    }
  }

  async getProducts() {
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
    // Validar que el Id sea incremental
    product.id = this.products.length + 1;

    // Validar que el code sea pasado por el usuario
    if (!product.code) {
      console.log("Error: El código del producto es obligatorio.");
      return;
    }

    // Validar que el code no se repita
    const codeExists = this.products.some((p) => p.code === product.code);
    if (!codeExists) {
      this.products.push(product);

      const respuesta = await this.saveFile();

      if (respuesta) {
        console.log("Producto agregado");
      } else {
        console.log("Hubo un error al agregar el producto");
      }
    } else {
      console.log("Error: El código del producto ya existe.");
    }
  }

  async getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    return product || "Not found";
  }

  async deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      try {
        await this.saveFile();
        console.log("Producto eliminado");
      } catch (error) {
        console.log("Hubo un error al eliminar el producto");
      }
    } else {
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
  constructor(title, description, price, thumbnail,code ,stock) {
    this.id = 0; // Autoincremel
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code; 
    this.stock = stock;
  }
}


// -------- Pruebas ---------

const Test = async () => {
  const producto1 = new Products(
    "Zapatillas Nike Air Force",
    "Zapatillas cómodas color negro",
    125000,
    "Imagen.url",
    'Asds154',
    25
  );

  const producto2 = new Products(
    "Zapatillas Adidas",
    "Zapatillas cómodas color rojo",
    115000,
    "Imagen.url",
    'Asds155',
    20
  );

  const producto3 = new Products(
    "Zapatillas PuMa",
    "Zapatillas Triple A color beige",
    215000,
    "Imagen.url",
    'Asds156',
    21
  );

  const manager = new ProductManager("./productos.json");

  console.log(await manager.getProducts());

  await manager.addProduct(producto1);
  await manager.addProduct(producto2);
  await manager.addProduct(producto3);
  console.log(await manager.getProducts());

  await manager.updateProduct(1, {
    title: "Zapatillas Nike Air Force 69",
    description: "Nuevas zapatillas",
    price: 130000,
    thumbnail: "NuevaImagen.url",
    stock: 30,
  });

  console.log(await manager.getProducts());

  console.log("Producto traído por Id: ", await manager.getProductById(1));

  // await manager.deleteProduct(1);
};

Test();
