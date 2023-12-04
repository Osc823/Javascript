import express from 'express';
import { Server } from "socket.io";
import router from './routes/main.router.js';
import handlebars from "express-handlebars"
import __dirname from './utils.js';
import { ProductManager } from './productManager/ProductManager.js';

//Socket Server

const app = express();
const PORT = 5000;


const httpServer = app.listen(PORT, () => {
    console.log(`Server listened on port ${PORT}`);
});

//Instancia Websocket
const io = new Server(httpServer);


//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Configuracion de plantilla de motor engine
app.engine("hbs", handlebars.engine({
    // index.hbs
    extname: ".hbs",
     // Plantilla principal
    defaultLayout:"main"
}))

//Seteamos nuestro motos
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

//public
app.use(express.static(`${__dirname}/public`));

//Routes
app.use(router)

const productManager = new ProductManager("./products.json");

//Socket communication
io.on("connection", (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on("product_send",async  (data) => {
        console.log(data);
        try {
            await productManager.saveFile(data);
            socket.emit("products", productManager.getProducts());
        } catch (error) {
            console.log(error);
        }
    });
    socket.emit("products", productManager.getProducts());
    
})