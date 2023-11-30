const express = require('express')
const Product =require('../models/Products.model')

const router = express.Router();
router.get(`/`, async (req,res)=>{
    const productList=await Product.find();
    if(!productList){
        res.status(500).json({
            error:err,
            success:false
        })
    }
res.json(productList)
})

router.post(`/`, (req,res)=>{
   const product= new Product({
    name: req.body.name,
    image : req.body.image,
    countInStock: req.body.countInStock
   })
   product.save()
   .then(createdProduct=>{
    res.status(201).json(createdProduct)
   })
   .catch((err)=>{
    res.status(500).json({
        error:err,
        success:false
    })

})
//res.json(book)
})
module.exports = router;  // Export the model