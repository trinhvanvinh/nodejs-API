const express =  require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../../models/products');

router.get('/', (req,res, next)=>{
    // res.status(200).json({
    //     message:'Handling get request to /products'
    // });

    Product.find()
    .select('name price _id')
    .exec().then(doc =>{
        const response = {
            count: doc.length,
            products: doc.map(docs =>{
                return{
                    name: docs.name,
                    price: docs.price,
                    _id: docs._id,
                    request: {
                        type: 'GET'
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

router.post('/', (req, res, next)=>{

    // const product ={ 
    //     name: req.body.name,
    //     price :  req.body.price
    // };

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message:'Handling POST request to /products',
            createdProduct: product
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

    Product.findById(id).exec().then(doc =>{
        console.log("From database ", doc);
        if(doc){
            res.status(200).json(doc);
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
        console.log(result);
        res.status(200).json(result);
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
        res.status(200).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
})

module.exports = router;