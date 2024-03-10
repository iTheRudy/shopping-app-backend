import express from "express"
import cors from "cors"
import simpleGit from "simple-git";
import {Product} from "./app/products/Product";
import bodyParser from "body-parser";
import usersRoutes from './app/users/routes';


const app = express();
app.use(cors())
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
})

const products = new Array<Product>();

app.use(bodyParser.json());
app.use('/users', usersRoutes)

app.get('/index', (req, res) => {

    console.log(req.headers)

    res.json({
        status: 200,
        data: "hi"
    })
    return res;
})

app.get('/', (req, res) => {

    console.log(req.headers)

    res.json({
        status: 200,
        data: "hello"
    })
    return res;
})
//
// app.post('/product', (req, res) => {
//     const body = req.body;
//     console.log(body);
//     const product = new Product(body.productId, body.productName);
//     products.push(product)
//     res.setHeader('Content-Type', 'application/json'); // Set Content-Type to HTML
//     res.json({
//         status: 200,
//         data: product
//     })
//     return res;
// })
//
// app.get('/products/all', (req, res) => {
//     res.json({
//         status: 200,
//         data: products
//     })
// })
//

