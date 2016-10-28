var express = require('express');
var router = express.Router();
var fs = require("fs");
var https=require('https');
// mongodb model
var endpoint=require('../Dao/endpoint');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

// homepage controller
router.get('/indexController', function(req, res) {
    // var c=1;
    //
    // if (req.cookies.isVisit) {
    //     console.log(req.cookies.isVisit);
    //     var c= parseInt(req.cookies.isVisit) + 1;
    //     res.cookie('isVisit', c, {maxAge: 60 * 1000});
    // } else {
    //     res.cookie('isVisit', 1, {maxAge: 60 * 1000});
    // }

    endpoint.find({},function(err,doc){
        if(err){
            res.send(err);
        }else{
            res.send(JSON.stringify(doc));
        }
    });

  // var data = fs.readFileSync('./json/endpoints.json');
  // var endpoints=JSON.parse(data).endpoints;
  // checkHealth(endpoints);


  // function checkHealth(endpoints){
  //   endpoints.forEach(function (endpoint) {
  //     monitor(endpoint,function(data){
  //       res.render("index");
  //     });
  //   });
  // }
  //
  // function monitor(endpoint,callback){
  //   console.log("hello");
  //   var options={
  //     'host':'encrypted.google.com',
  //     'path':'/',
  //     'method':endpoint.method
  //   };
  //
  //   var request=https.request( options, function(response){
  //     var body="";
  //     response.on("data" , function (chunk) {
  //       body+=chunk.toString('utf8');
  //     })
  //     response.on("end" , function () {
  //       console.log(endpoint.id);
  //       callback(body);
  //     })
  //   });
  //   request.end();
  // }
});

// endpoint form manipulate
router.get('/addEndpoint', function(req, res){
    res.render("addEndpoint");
});
router.post('/addEndpointController', function(req, res){
    var newEndpoint=req.body.data;
    console.log(newEndpoint);
    endpoint.create(newEndpoint, function(err,doc){
        if(err) {
            console.log(err);
        } else {
            res.send("success");
        }
    });
});

module.exports = router;
