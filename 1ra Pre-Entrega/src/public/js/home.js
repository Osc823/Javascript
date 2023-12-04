const socket = io();

socket.on("products", (data) => {
    const products = document.querySelector("#productsRealTime2");
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