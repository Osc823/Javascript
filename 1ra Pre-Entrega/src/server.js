import express from 'express';
import router from './routes/main.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(router)


app.listen(8080, () => {
    console.log('Server listened on port 8080');
})