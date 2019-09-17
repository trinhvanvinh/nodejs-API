const express =  require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './uploads/');
    },
    filename:function(req, res, cb){
        cb(null, new Date().toISOString()+file.originalname);
    }
});

const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/jpeg'
    || file.mimetype === 'image/png'
    ){
        cb(null, true);
    }else{
        cb(null, false);
    }  
}

const upload = multer({storage: storage, limits:{
    fileSize: 1024 * 1024 * 5
}, 
    fileFilter: fileFilter
});

const Product = require('../../models/products');

router.get('/', (req,res, next)=>{
    // res.status(200).json({
    //     message:'Handling get request to /products'
    // });

    Product.find()
    .select('name price _id productImage')
    .exec().then(doc =>{
        const response = {
            count: doc.length,
            products: doc.map(docs =>{
                return{
                    name: docs.name,
                    price: docs.price,
                    productImage: docs.productImage,
                    _id: docs._id,
                    request: {
                        type: 'GET',
                        url:'http://localhost:3000/products/'+doc._id
                    }
                }
            })
        }
        // console.log(docs);
        // if(docs.length >=0){
            res.status(200).json(response);
        // }else{
        //     res.status(404).json({
        //         message:'No entries found'
        //     });
        // }
       
        }).catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

});

router.post('/', upload.single('productImage') ,(req, res, next)=>{

    console.log(req.file);

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });

    product.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message:'created prod successfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                require:{
                   type : 'GET',
                   url:'http://localhost:3000/products'+result._id
                }
            }
        });;
    }).catch(err =>{
        console.log(err)
        res.status(500).json({
            error: err
        });;
    }
    );

    
});

router.get('/:productId',(req, res, next )=>{
    const id= req.params.productId;
    // if(id === 'special'){
    //     res.status(200).json({
    //         message: 'you discovered the special ID',
    //         id: id
    //     });
    // }else{
    //     res.status(200).json({
    //         message: 'You passed an ID'
    //     })
    // }

    Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(doc =>{
        console.log("From database ", doc);
        if(doc){
            res.status(200).json({
                product: doc,
                require:{
                    type:'GET',
                    description:'Get all prod',
                    url:'http://localhost:3000/products'
                }
            });
        }else{
            res.status(404).json({
                message:'No valid entry found database'
            })
        }
    }).catch(err => 
        {
            console.log(err);
            res.status(500).json({error: err});

        }
    );

});

router.patch('/:productId', (req, res, next)=>{

    const id = req.params.productId;
    const updateOps ={};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value
    }
    Product.update({
        _id: id
    },
    {
        $set:updateOps
    }).exec().then(result=>{
        res.status(200).json({
            message: 'product updated',
            require:{
                type:'GET',
                url: 'http://localhost:3000/products/'+id
            } 
        });
    }).catch(
        err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        }
    );

} );

router.delete('/:productId', (req, res, next)=>{

    const id = req.params.productId;
    Product.remove({
        _id: id
    })
    .exec()
    .then(result => {
        res.status(200).json({
            message:'Product deleted',
            request:{
                type:'POST',
                url:'http://localhost:3000/products',
                body:{
                    name:'String',
                    price:'Number'
                }
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
})

module.exports = router;