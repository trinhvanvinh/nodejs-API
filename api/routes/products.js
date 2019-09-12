const express =  require('express');
const router = express.Router();

router.get('/', (req,res, next)=>{
    res.status(200).json({
        message:'Handling get request to /products'
    });
});

router.post('/', (req, res, next)=>{
    res.status(200).json({
        message:'Handling POST request to /products'
    });;
});

router.post('/:productId',(req, res, next )=>{
    const id= req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message: 'you discovered the special ID',
            id: id
        });
    }else{
        res.status(200).json({
            message: 'You passed an ID'
        })
    }
});

router.patch('/:productId', (req, res, next)=>{
    res.status(200).json({
        message: 'updated product'
    })
} );

router.delete('/:productId', (req, res, next)=>{
    res.status(200).json({
        message: 'deleted product'
    })
})

module.exports = router;