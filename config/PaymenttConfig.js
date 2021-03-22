
module.exports.stripeToken =   "sk_test_SZTECCqFQ9NHVOI5p5uWwa6C";
module.exports.stripePublicToken = "pk_test_CD7oNmd7vkxeuokuooa5Vja2";

const Razorpay = require('razorpay')

const razorpay = new Razorpay({
    key_id: 'rzp_test_o21zeQefvKsPi8',
    key_secret: 'zoZ0eHpLBH9h2U5CoZdTUHC0'
})

module.exports = razorpay;


