var express =require('express');
var router=express.Router();
//var crypto = require('crypto');
var Ware = require('../models').Ware;

//添加商品
router.post('/add', function (req, res) {
    var ware = req.body;
    console.log(ware);
        new Ware({
            name: ware.name,
            price: ware.price,
            imgSrc: 'http://www.baidu.com'
        }).save(function (err, ware) {
                if (err) {
                    res.status(500).json({msg: err});
                } else {
                    res.json(ware);
                }
            });

});

module.exports = router;