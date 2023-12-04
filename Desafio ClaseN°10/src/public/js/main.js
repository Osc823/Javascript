const socket = io()

const form = document.querySelector("form")

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const {name} = formData.get("thumbnail")
    
    const createProduct = {
        title : formData.get("title"), 
        description: formData.get("description"), 
        price: formData.get("price"), 
        thumbnail:name,
        code: formData.get("code"), 
        stock: formData.get("stock")
    }
    socket.emit("product_send", createProduct)

    form.reset()
})

socket.on("products", (data) => {
    const products = document.querySelector("#productsRealTime");
    console.log('Numeros', data);
    products.innerHTML = data.map((product) => {
        return `
        <p>
        Titulo: ${product.title} 
        Descripcion: ${product.description} 
        Precio :${product.price}
        Imagen: ${product.thumbnail}
        Codigo: ${product.code}
        Stock: ${product.stock}
        <button id=${product.id}> Eliminar </button>
        </p>
        `
    }).join("  ");
})
