const express =  require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message:'order were fetched'
    });
});

router.post('/', (req, res, next)=>{
    res.status(200).json({
        message:'Oder was created!'
    });
});

module.exports = router;