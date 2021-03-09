var async = require('async');
var stripe = require('stripe') ('sk_test_SZTECCqFQ9NHVOI5p5uWwa6C');

router.post('/payment', function(req, res, next) {

  var stripeToken = req.body.stripeToken;
  var currentCharges = Math.round(req.body.stripeMoney * 100);
  stripe.customers.create({
    source: stripeToken,
  }).then(function(customer) {
    return stripe.charges.create({
      amount: currentCharges,
      currency: 'usd',
      customer: customer.id
    });
  }).then(function(charge) {
    async.waterfall([
      function(callback) {
        Cart.findOne({ owner: req.user._id }, function(err, cart) {
          callback(err, cart);
        });
      },
      function(cart, callback) {
        client.findOne({ _id: req.user._id }, function(err, user) {
          if (user) {
            for (var i = 0; i < cart.items.length; i++) {
              user.history.push({
                item: cart.items[i].item,
                paid: cart.items[i].price
              });
            }

            user.save(function(err, user) {
              if (err) return next(err);
              callback(err, user);
            });
          }
        });
      },
      function(user) {
        Cart.update({ owner: user._id }, { $set: { items: [], total: 0 }}, function(err, updated) {
          if (updated) {
            res.redirect('/profile');
          }
        });
      }
    ]);
  });


});
