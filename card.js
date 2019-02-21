var express = require('express');
const app = express();
const stripe = require("stripe")("sk_test_gefq5UMAGqWple2CgDNcNXQ0");

app.set("view engine", "pug");

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
  	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  	res.header('Access-Control-Allow-Headers', 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range');
    res.header('Access-Control-Max-Age', 1728000);
   	res.header('Content-Type', 'text/plain; charset=utf-8');
    res.header('Content-Length', 0);
      
    if ('OPTIONS' == req.method) {
     	res.send(200);
    }
    else {
    	next();
  	}
	};

  app.use(allowCrossDomain);  
  app.disable('etag');

app.post("/charge", async (req, res) => {
  console.log('Request coming from react'+req.body);
  try {
    let {status} = stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body.id
    });

    res.json({status});
  } catch (err) {
    res.status(500).end();
  }
});



app.listen(5000, function (){
	console.log("Payment gateway api is listening you");
})