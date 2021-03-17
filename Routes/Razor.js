const Razorpay = require('razorpay')
const express = require('express');
const router = express.Router();
const crypto = require('crypto')
const razorpay = new Razorpay({
    key_id: 'dhffd',
    key_secret: 'dhfdfh'
})

router.post('/orders', async (req, res) => {
    const options = {
        amount: req.body.amount,
        currency: 'INR',
        receipt: shortid.generate(), //any unique id
      //  payment_capture = 1 //optional
    }
    try {
        const response = await razorpay.orders.create(options)
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount
        });
    } catch (error) {
        console.log(error);
        res.status(400).send('Unable to create order');
    }
});

router.post('/paymentCapture', (req, res) => {
    // do a validation
    const data = crypto.createHmac('sha256', secret_key)
    data.update(JSON.stringify(req.body))
    const digest = data.digest('hex')
    if (digest === req.headers['x-razorpay-signature']) {
        console.log('request is legit')
        //we can store detail in db and send the response
        res.json({
            status: 'ok'
        });
    } else {
        res.status(400).send('Invalid signature');
    }
});

router.post("/success", async (req, res) => {
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/refund', async (req, res) => {
    try {
        //first validate the payment Id then call razorpay API
        const options = {
            payment_id: req.body.paymentId,
            amount: req.body.amount,
        };
        const razorpayResponse = await razorpay.refund(options);
        //we can store detail in db and send the response
        res.send('Successfully refunded')
    } catch (error) {
        console.log(error);
        res.status(400).send('Unable to refund the payment');
    }
});

module.exports = router;

