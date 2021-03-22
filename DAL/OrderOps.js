const Order = require('../models/Order');
const razor = require('../Routes/Razor');

async function createOrder(params)
{
    var options = {
        amount: params.billingAmount,
        currrency : 'INR',
    }    
    try
    {
        const response = await razorpay.orders.create(options); // Creating razorPayOrder
        const order = new Order({                       
            razorpay_payment_id : response.id,
            clientID            : params.clientID,
            clientName          : params.clientName,
            shippingAddress     : params.shippingAddress,
            billingAddresss     : params.billingAddresss,
            orderDate           : params.orderDate,
            deliveryDate        : params.deliveryDate,
            billingAmount       : params.billingAmount,
            status              : params.status,
            trackingID          : params.trackingID,
            negotiations        : params.negotiations,
            productsID          : params.productsID,
            tax                 : params.tax,
            amountBeforeTax     : params.amountBeforeTax,
            total               : params.total,
            transactionID       : params.transactionID,
            });
        let new_order = await order.save();                     //Generating System Order
        return new_order;
    }   catch(err) {
            return err;
    } 
}

async function cancelOrder(orderID)
{
    var filter = {orderID : orderID};
    var update = {status : 'Cancelled'};
    let order = await Order.findOneAndUpdate(filter, update, {new : true});
    let new_order = order.save((err)=>{
        return err;
    })
    if(new_order.orderID)
    {
          return new_order; 
    }
    return "ERROR";
}

async function approveOrder(orderID)
{
    var filter = {orderID : orderID};
    var update = {status : 'Approved'};
    let order = await Order.findOneAndUpdate(filter, update, {new : true});
    let new_order = order.save((err)=>{
        return err;
    })
    if(new_order.orderID)
    {
          return new_order; 
    }
    return "ERROR";
}

async function pendingOrder(orderID)
{
    var filter = {orderID : orderID}
    var update = {status : 'pending'}
    let order = await Order.findOneAndUpdate(filter, update, {new : true});
    let new_order = order.save((err)=>{
        return err;
    })
    if(new_order.orderID)
    {
          return new_order; 
    }
    return "ERROR";
}

async function approveOrder(orderID)
{
    var filter = {orderID : orderID}
    var update = {status : 'Approved'}
    let order = await Order.findOneAndUpdate(filter, update, {new : true});
    let new_order = order.save((err)=>{
        return err;
    })
    if(new_order.orderID)
    {
          return new_order; 
    }
    return "ERROR";
}


asy
modules.export.createOrder = createOrder;
modules.export.cancelOrder = cancelOrder;
modules.export.pendingOrder = pendingOrder;
modules.export.approveOrder = approveOrder;




