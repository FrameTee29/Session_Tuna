var express = require('express');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var session = require('express-session');
var  app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(session({

    secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}))
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// if not login Please login 
app.get('/admin',(req,res)=>{
    res.render('pleaseLogin')
})

//Check password == 240311 
app.post('/admin',urlencodedParser,(req,res,next)=>{
    var session = req.session;
    session.Password = req.body.InputPassword;
    session.Email = req.body.InputEmail;
    console.log(session.Password);

    // if have Email and Password Route to admin page
    if(session.Password == 240311 && session.Email !='' ){
        res.render('admin', { email: req.session.Email })

    }
    // Show Please Login
    else{
        res.render('pleaseLogin');
    }

});

app.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
 });
 

 
 app.listen(8000);