const express=require('express')

const app = express();
const cors = require('cors');
const auth =require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

const morgan =require('morgan')
const mongoose =require('mongoose')
const ProductRouter =require('./routers/products.routers');
const categoriesRoutes = require('./routers/categories.routers');
const usersRoutes =require('./routers/users.routers');
require('dotenv/config')

const api = process.env.API_URL
const connexionDB =process.env.DB
//midlleware
app.use(cors());
app.options('*', cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(auth);
app.use(errorHandler);



app.use(`${api}/product`,ProductRouter);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/users`, usersRoutes);



mongoose.connect(process.env.DB)
.then(()=>{
    console.log("database is connected ");
})
.catch((err)=>{
    console.log(`faild to connect to database : ${err}`);
})
app.listen('3000',()=>{
    console.log('server is running on port 3000')
})
