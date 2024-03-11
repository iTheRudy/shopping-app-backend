import express from "express"
import cors from "cors"
import simpleGit from "simple-git";
import {Product} from "./app/products/Product";
import bodyParser from "body-parser";
import usersRoutes from './app/users/routes';
import productsRoutes from './app/products/routes'
// @ts-ignore
import {connect} from "./db";


const app = express();
// app.use(cors())
// app.listen(3000, () => {
//     console.log(`Server is running on port 3000`);
// })

// @ts-ignore
// connect()
//     .then((db: { databaseName: any; }) => {
//         console.log('Connected to the database ', db.databaseName);
//
//         // Include database-related middleware or route handlers here
//         // For example:
//         // app.get('/users', async (req, res) => {
//         //   const users = await db.collection('users').find().toArray();
//         //   res.json(users);
//         // });
//
//         // Start the server
//         app.use(cors())
//         const PORT = process.env.PORT || 3000;
//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });
//     })
//     .catch((error: any) => {
//         console.error('Failed to connect to the database:', error);
//         process.exit(1); // Exit the process if database connection fails
//     });

connect()
    .then((db) => {
        console.log('Connected to the database ');

        // Include database-related middleware or route handlers here
        // For example:
        // app.get('/users', async (req, res) => {
        //   const users = await db.collection('users').find().toArray();
        //   res.json(users);
        // });

        // Start the server
        app.use(cors());
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Failed to connect to the database:', error);
        process.exit(1); // Exit the process if database connection fails
    });
const products = new Array<Product>();

app.use(bodyParser.json());
app.use('/users', usersRoutes)
app.use('/products', productsRoutes);

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

