const Order = require('../models/Order');
const rz = require('../config/PaymenttConfig');
const rz_key_id = rz.rz_key_id;
const razorpay = rz.razorpay;
async function createOrder(params)
{
    var options = {
        amount: params.total_price,
        currency : 'INR',
    }  
    try
    {
        const response = await razorpay.orders.create(options); // Creating razorPayOrder
        const order = new Order({                       
            razorpay_order_id   : response.id,
            currrency           : response.currency,
            client              : params.client,
            shipping            : params.shipping,
            billingAddresss     : params.billingAddresss,
            deliveryDate        : params.deliveryDate,
            total_price         : params.total_price,
            negotiation         : params.negotiation,
            orderItems          : params.orderItems,
        });
        await order.save();                     //Generating System Order
        return {
            key         :   rz_key_id,
            amount      :   response.amount,
            currency    :   response.currency,
            razorpay_order_id    :   response.id,  
        };
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


module.exports.createOrder = createOrder;
module.exports.cancelOrder = cancelOrder;
module.exports.pendingOrder = pendingOrder;
module.exports.approveOrder = approveOrder;




