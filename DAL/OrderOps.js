const Order = require('../models/Order');

async function createOrder(params)
{
    const order = new Order({
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
    transactionID       : params.transactionID
    });
    let new_order = order.save((err)=>{
        return err;
    })
    if(new_order.orderID)
    {
          return new_order; 
    }
    return "ERROR"
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

async function moveToCart(orderID)
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


modules.export.createOrder = createOrder;
modules.export.cancelOrder = cancelOrder;
modules.export.approveOrder = approveOrder;




