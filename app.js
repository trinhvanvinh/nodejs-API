const express = require('express');
const app= express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect('mongodb+srv://restAPI:trinhvanvinh018@restapi-4od1g.mongodb.net/test?retryWrites=true&w=majority',
<<<<<<< HEAD
   { useUnifiedTopology: true
},{ useNewUrlParser: true }, { useMongoClient: true}
=======
{ useNewUrlParser: true }
>>>>>>> 0fe11b0ec11d960c270f861722a7b569e53f01c9
  );
  mongoose.Promise=global.Promise;

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS' ){
        res.header('Access-Control-Alow-Methods','PUT', 'POST','GET', 'DELETE', 'PATH');
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes );

app.use((req, res, next)=>{
    const error = new Error(' Not Found');
    error.status=404;
    next(error);

});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;