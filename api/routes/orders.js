const express =  require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message:'order were fetched'
    });
});

router.post('/', (req, res, next)=>{

    const order ={ 
        productId: req.body.productId,
        quantily: req.body.quantily
    };

    res.status(201).json({
        message:'Oder was created!',
        order: order
    });
});

router.get('/:orderId',(req, res, next)=>{
    res.status(200).json({
        message:'order details',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId',(req, res, next)=>{
    res.status(200).json({
        message:'delete details',
        orderId: req.params.orderId
    });
}); 

module.exports = router;