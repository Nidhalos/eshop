const express=require('express')
const cors = require('cors');

const app = express();
const morgan =require('morgan')
const mongoose =require('mongoose')
const ProductRouter =require('./routers/products.routers')
const categoriesRoutes = require('./routers/categories.routers');

require('dotenv/config')
const api = process.env.API_URL
const connexionDB =process.env.DB
//midlleware
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors());
app.options('*', cors())

app.use(`${api}/product`,ProductRouter)
app.use(`${api}/categories`, categoriesRoutes);



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
