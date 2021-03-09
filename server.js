//imports
const express = require('express');
const bodyParser = require('body-parser');
const helmet    =   require('helmet');
const CartLength = require('./Middleware/Cart');

//route imports

const app = express();
const port = 3000; 

app.use(helmet());
app.use(bodyParser.json());
app.use('/api/Auth/admin', require("./Routes/AdminRoute"));
app.use('/api/Auth/client', require("./Routes/ClientRoute"));
app.use('/api/cat', require("./Routes/CategoryRoute"));
app.use('/api/product',require("./Routes/ProductRoute"));
app.use(cartLength);
app.use(function(req,res, next) {
	Category.find({}, function(err,categories) {
		if(err) return next(err);
		res.locals.categories= categories;
		next();
	});
});

app.listen(port, () =>
    console.log("Application is running")
);
