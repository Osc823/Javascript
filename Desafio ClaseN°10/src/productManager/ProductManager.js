import fs  from "fs";

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

  getProducts() {
    return this.products;
  }

  async saveFile(productsData) {
    if (!productsData) {
      return console.log('No hay productos aun');
    }
    const existProducts = this.products.find((p) => p.id === productsData.id)  
    if (existProducts) {
      console.log("El post ya existe");
      throw Error(`Post with id ${productsData.id} already exists`);
    }
    const lastProduct = this.products[this.products.length-1]
    const addId = lastProduct.id + 1
    const newProduct = {id: addId, ...productsData}
    try {
      this.products.push(newProduct)
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
    const product = this.products.find((p) => p.id == id);
    return product || "Not found";
  }

  async deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id == id);
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
    console.log('El id que me llega', id);
    const index = this.products.findIndex((p) => p.id == id);
    console.log('el index', index);
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
    this.status = true;
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
    'true',
    25
  );

  const producto2 = new Products(
    "Zapatillas Adidas",
    "Zapatillas cómodas color rojo",
    115000,
    "Imagen.url",
    'Asds155',
    'true',
    20
  );

  const producto3 = new Products(
    "Zapatillas PuMa",
    "Zapatillas Triple A color beige",
    215000,
    "Imagen.url",
    'Asds156',
    'true',
    21
  );
  const producto4 = new Products(
    "Camiseta Polo Ralph Lauren",
    "Camiseta de algodón con logo bordado",
    75000,
    "Imagen.url",
    'Asds157',
    'true',
    15
);

const producto5 = new Products(
    "Chaqueta Columbia Impermeable",
    "Chaqueta para exteriores resistente al agua",
    189000,
    "Imagen.url",
    'Asds158',
    'true',
    30
);

const producto6 = new Products(
    "Reloj Casio G-Shock",
    "Reloj resistente a golpes y al agua",
    98000,
    "Imagen.url",
    'Asds159',
    'true',
    18
);

const producto7 = new Products(
    "Laptop Dell Inspiron",
    "Laptop con procesador Intel Core i5 y 8GB de RAM",
    849000,
    "Imagen.url",
    'Asds160',
    'true',
    12
);

const producto8 = new Products(
    "Cámara Canon EOS Rebel",
    "Cámara DSLR con sensor de 24.1 megapíxeles",
    520000,
    "Imagen.url",
    'Asds161',
    'true',
    24
);

const producto9 = new Products(
    "Audífonos Sony WH-1000XM4",
    "Audífonos inalámbricos con cancelación de ruido",
    329000,
    "Imagen.url",
    'Asds162',
    'true',
    28
);

const producto10 = new Products(
    "Mochila North Face",
    "Mochila resistente con múltiples compartimentos",
    125000,
    "Imagen.url",
    'Asds163',
    'true',
    22
);

const producto11 = new Products(
    "Monitor ASUS Gaming",
    "Monitor LED Full HD de 27 pulgadas con frecuencia de actualización de 144Hz",
    1799000,
    "Imagen.url",
    'Asds164',
    'true',
    16
);

const producto12 = new Products(
    "Teclado mecánico Corsair",
    "Teclado para gaming con retroiluminación RGB",
    189000,
    "Imagen.url",
    'Asds165',
    'true',
    25
);

const producto13 = new Products(
    "Bicicleta de montaña Trek",
    "Bicicleta con cuadro de aluminio y suspensión delantera",
    569000,
    "Imagen.url",
    'Asds166',
    'true',
    19
);


  const manager = new ProductManager("./products.json");

  await manager.addProduct(producto1);
  await manager.addProduct(producto2);
  await manager.addProduct(producto3);
  await manager.addProduct(producto4);
  await manager.addProduct(producto5);
  await manager.addProduct(producto6);
  await manager.addProduct(producto7);
  await manager.addProduct(producto8);
  await manager.addProduct(producto9);
  await manager.addProduct(producto10);
  await manager.addProduct(producto11);
  await manager.addProduct(producto12);
  await manager.addProduct(producto13);
};

// Test();

export {ProductManager ,Products};
