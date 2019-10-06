const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
    name:{type: String , required: true },
    price: {type: Number, required: true},
     productImage: { type: String, required: true }
=======
    name:{type: String , require: true },
    price: {type: Number, required: true},
    productImage:{type: String, require: true}

>>>>>>> 0fe11b0ec11d960c270f861722a7b569e53f01c9
});

module.exports = mongoose.model('Product', productSchema); 