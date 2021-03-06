var express =require('express');
var path=require('path');
var app=express();

var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/zhufengshop');

var bodyParser = require('body-parser');


// 静态服务器中间件
app.use(express.static(path.join(__dirname,'app','public')));
app.use(bodyParser.json()); //解析json请求
app.use(bodyParser.urlencoded({extended:false}));

var wares = require('./routes/wares');
var users = require('./routes/users');


app.use(session({
    secret:'thinksley',
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:60*60*100
    },
    store:new MongoStore({
        url:'mongodb://127.0.0.1/zhufengshop'
    })
}));

app.use('/users',users);
app.use('/wares',wares);

app.listen(8080);