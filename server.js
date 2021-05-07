//imports
const express = require('express');
const bodyParser = require('body-parser');
const helmet    =   require('helmet');
// const CartLength = require('./Midddleware/Cart');
const cors = require('cors');

const conn = require('./DAL/Connection')

// var corsOptions = {
//     origin: 'http://localhost:4000', 
//     optionsSuccessStatus: 200 // For legacy browser support
// }




//route imports

const app = express();
const port = 3000; 


app.use(cors());
app.use(helmet());

app.use(bodyParser.json());

// app.use('/api/Auth/admin', require("./Routes/AdminRoute"));
// app.use('/api/Auth/client', require("./Routes/ClientRoute"));
// app.use('/api/cat', require("./Routes/CategoryRoute"));

// app.use('/api/product',require("./Routes/ProductRoute"));
// app.use('/api/order/', require("./Routes/orderRoute"));
// app.use("/payment", require("./routes/Razor"));
// // app.use("/paytm", require("./routes/Razor"));
app.use("/api", require("./Routes/QuoteRoute"));


app.listen(port, () =>
{
    console.log("Application is running");
});




