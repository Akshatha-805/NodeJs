var express=require('express');
var bodyParser=require('body-parser');
var fs=require('fs');
var app=express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.set('view engine','ejs');

app.get('/info',function(req,res){
    res.sendFile(__dirname +'/login.html');
});
app.post('/info',urlencodedParser,function(req,res){
    //console.log(req.body);
    const cname=req.body.cName;
    const pass=req.body.cPassword;
    const users = require("./userinfo"); 
    const obj={name:cname,password:pass};
    users.push(obj);
    fs.writeFile("userinfo.json", JSON.stringify(users), err => { 
        if (err) throw err;  
       console.log("Done writing"); // Success 
    }); 

    res.render('success',{data:req.body});
});
app.listen(3000);