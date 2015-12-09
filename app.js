var express =require('express');
var path=require('path');
var app=express();
var bodyParser=require('body-parser');
// 静态服务器中间件
app.use(express.static(path.join(__dirname,'app','public')));
app.use(bodyParser.json()); //解析json请求
app.use(bodyParser.urlencoded({extended:false}));

app.use('/users',users);

app.listen(8080);