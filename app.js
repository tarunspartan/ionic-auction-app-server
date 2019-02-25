var mongoose = require("mongoose");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
//require('dotenv').config()
app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
//var port = process.env.PORT | 3000
app.post("/signup", function (req, res) {
    users.create(req.body, function (err, response) {
        if (err)
            return res.json({
                status: "Error"
            });
        else
            return res.json({
                status: "Ok"
            });
    });
});

app.post("/signin", function (req, res) {
    let usermail = req.body.mail;
    let userpassword = req.body.password;
    // console.log(req.body)
    users.find({
            email: usermail
        },
        function (err, response) {
            if (err) {
                console.log("error occured");
                return res.json({
                    status: "Database Error"
                });
            } else {
                // console.log(response.length);
                if (response.length == 0) {
                    return res.json({
                        Status: "Not Found"
                    });
                } else if (userpassword == response[0].password)
                    return res.json({
                        status: "OK"
                    });
                else {
                    return res.json({
                        status: "Authentication Failed"
                    });
                }
            }
        }
    );
});

app.post("/sell", function (req, res) {
    products.create(req.body, function (err, response) {
        if (err)
            return res.json({
                status: "Error"
            });
        else
            return res.json({
                status: "Ok"
            });
    });
});

app.post("/updateBidPrice", function (req, res) {
    // console.log(req.body);
    products.findOneAndUpdate({
            _id: req.body.id
        }, {
            $set: {
                bidprice: req.body.bidprice,
                bidder: req.body.mail
            }
            // $set: {
            //     "bidder": req.body.mail,
            // }
        },
        function (err, response) {
            if (err)
                return res.json({
                    Status: "Error"
                });
            else
                return res.json({
                    Status: "OK"
                });
        }
    );
});

app.get("/sell", function (req, res) {
    // console.log(req.query)
    products.find({}, function (err, data) {
        if (err)
            return res.json({
                status: "Error"
            });
        // console.log(data);
        else return res.send(data);
    });
});

app.get("/getitem", function (req, res) {
    // console.log(req);
    let itemid = req.query._id;
    // console.log(req.query)
    products.find({
            _id: itemid
        },
        function (err, data) {
            if (err)
                return res.json({
                    status: "Error"
                });
            // console.log(data);
            else return res.send(data);
        }
    );
});

app.get("/sellbyuser", function (req, res) {
    let usermail = req.query.mail;
    products.find({
            mail: usermail
        },
        function (err, data) {
            if (err) {
                return res.json({
                    Status: "Error"
                });
            } else {
                return res.send(data);
            }
        }
    );
});

app.get("/mybids", function (req, res) {
    let bidder = req.query.bidder;
    products.find({
            bidder: bidder
        },
        function (err, data) {
            if (err) {
                return res.json({
                    Status: "Error"
                });
            } else {
                return res.send(data);
            }
        }
    );
});

app.delete("/deleteitem/:id", function (req, res) {
    // console.log(req.params)
    var item = req.params.id;
    // console.log(item);
    products.deleteOne({
            _id: item
        },
        function (err, data) {
            if (err)
                return res.json({
                    Status: "Error"
                });
            else
                return res.json({
                    Status: "Deleted"
                });
        }
    );
});

mongoose.connect(
    "mongodb://tarunspartan:Qwerty.123@ds223605.mlab.com:23605/autionapp", {
        useNewUrlParser: true
    }
);
var users = mongoose.model("users", {
    fullName: String,
    email: String,
    phoneNumber: String,
    password: String
});
var products = mongoose.model("products", {
    mail: String,
    name: String,
    initialprice: Number,
    bidprice: Number,
    bidder: String,
    date: String,
    image: String,
    description: String
});
// users.create({
//     "fullName" : "Tarun Spartan",
//     "email" : "mail@mail.com",
//     "phoneNumber": "9000163423",
//     "password": "asdfgh"
// },function(err,dbresp){
//     if(err)
//     {
//         console.log(err)
//     }
//     else{
//         console.log(dbresp)
//     }
// })
app.listen(process.env.PORT || 3000, function () {
    console.log("Listening at 3000");
});

app.get("/", function (req, res) {
    res.send("<h1>Hello world!</h1>");
})