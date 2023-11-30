const mongoose =require('mongoose')

const productSchema = mongoose.Schema({
    name:String,
    image:String,
    countInStock:{
        type:Number,
    required:true}
})
const Product = mongoose.model('products', productSchema);  // Corrected model name

module.exports = Product;  // Export the model