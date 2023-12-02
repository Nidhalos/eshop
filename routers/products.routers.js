const express = require('express')
const Product =require('../models/Products.model')
const Category = require('../models/Categories.model'); // Make sure to import the Category model
const mongoose =require('mongoose')

const router = express.Router();
router.get(`/`, async (req, res) =>{
    let filter = {};
    if(req.query.categories)
    {
         filter = {category: req.query.categories.split(',')}
    }

    const productList = await Product.find(filter).populate('category');

    if(!productList) {
        res.status(500).json({success: false})
    } 
    res.send(productList);
})
router.get(`/:id`, async (req,res)=>{
    const productList=await Product.findById(req.params.id);
    if(!productList){
        res.status(500).json({
            error:err,
            success:false
        })
    }
res.json(productList)
})
router.post(`/`, async (req, res) => {
    try {
        console.log('Category ID from request:', req.body.category);
        if (!mongoose.Types.ObjectId.isValid(req.body.category)) {
            return res.status(400).send('Invalid Category ID');
        }
        const category = await Category.findById(req.body.category);

        if (!category) {
            return res.status(400).send('Invalid Category');
        }

        // const file = req.file;
        // if (!file) return res.status(400).send('No image in the request')

        // const fileName = file.filename
        // const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image, // "http://localhost:3000/public/upload/image-2323232"
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        });

        product = await product.save();

        if (!product) {
            return res.status(500).send('The product cannot be created');
        }

        res.send(product);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
router.put('/:id',async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id)) {
       return res.status(400).send('Invalid Product Id')
    }
    const category = await Category.findById(req.body.category);
    if (!mongoose.Types.ObjectId.isValid(req.body.category)) {
        return res.status(400).send('Invalid Category ID');
    }
    if(!category) return res.status(400).send('Invalid Category')

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true}
    )

    if(!product)
    return res.status(500).send('the product cannot be updated!')

    res.send(product);
})
router.delete('/:id', (req, res)=>{
    Product.findByIdAndDelete(req.params.id).then(product =>{
        if(product) {
            return res.status(200).json({success: true, message: 'the product is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "product not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})
router.get(`/get/count`, async (req, res) =>{
    const productCount = await Product.countDocuments()
    if(!productCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        productCount: productCount
    });
})

router.get(`/get/featured/:count`, async (req, res) =>{
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({isFeatured: true}).limit(+count);

    if(!products) {
        res.status(500).json({success: false})
    } 
    res.send(products);
})
module.exports = router;  // Export the model