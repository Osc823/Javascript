class ProductManager {
  constructor() {
    this.products = [];
  }
  getProducts() {
    return this.products;
  }
  addProduct(product) {
    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.stock
    ) {
      return "Faltan datos por llenar";
    }
    // Generar Codigo
    const code = Math.floor(Math.random() * 900) + 100;
    // Validar que el codigo no se repita
    const codeExists = product.code.find((cod) => cod === code);
    if (!codeExists) {
      // Asignamos el codigo al producto
      product.code.push(code);
      this.products.push(product);
    }
  }
  getProductById(id) {
    for (const product of this.products) {
      if (product.id === id) {
        return product;
      }
    }
    return "Not found";
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
const newProduct = new ProductManager();

// 1) Crear productos
newProduct.addProduct(
  new Products(
    "Zapatillas Nike Air Force",
    "Zapatillas comodas color negro",
    125000,
    "Imagen.url",
    25
  )
);
newProduct.addProduct(
  new Products(
    "Zapatillas Adidas",
    "Zapatillas comodas color rojo",
    120000,
    "Imagen.url",
    22
  )
);
console.log('Productos creados con exito!');
console.log(newProduct.getProducts());

//2) Buscar producto por Id
console.log("Productos buscados por ID:");
console.log(newProduct.getProductById(1));
console.log(newProduct.getProductById(3));
