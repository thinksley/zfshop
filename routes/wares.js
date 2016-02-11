var express =require('express');
var router=express.Router();
//var uuid = require('uuid');
var parser = require('multer')().single('imgSrc');

var Ware = require('../models').Ware;
var mime = require('mime');
var uuid=require('uuid');
var fs = require('fs');
//添加商品
router.post('/add',parser,function(req,res){
    var ware=req.body;
    var imgInfos=ware.imgSrc.split(',')
    var ext = mime.extension(imgInfos[0].slice(imgInfos[0].indexOf(":") + 1, imgInfos[0].indexOf(";")));
    var imgSrc = uuid.v4() + '.' + ext;
    fs.writeFile('./app/public/upload/' + imgSrc, imgInfos[1], 'base64', function (err, result) {
        new Ware({
            name:ware.name,
            price:ware.price,
            imgSrc:ware.imgSrc
        }).save(function(err,ware){

                if(err){
                    res.status(500).json({msg:err});
                }else{
                    res.json(ware);
                }
            });
    })

})


router.get('/list',function(req,res){
    Ware.find({},function(err,wares){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(wares);
        }
    });
});

router.post('/detail',function(req,res){
    var id=req.body.id;

    Ware.findOne({_id:id},function(err,wares){
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(wares);
        }
    });

});

module.exports = router;