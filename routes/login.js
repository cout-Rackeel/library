var express = require('express');
var router = express.Router();
var conn = require('../lib/db')
const bcrypt = require('bcrypt')

router.get('/' , (req,res,next) => {
  
    res.render('login/login' , {title:'Login Page' , stylesheet:''  , bootstrap:false , my_session : req.session} )
  
})


router.get('/signup' , (req,res,next) => {

  res.render('login/signup' , {title:'Sign up Page' , stylesheet:''  , bootstrap:false , my_session : req.session})

})

router.post('/add', (req,res,next) => {
  var saltRounds = 10;
  var addSQL = 'INSERT INTO users SET ? ';

  function checkEmail() {
    var response;
    
    if(req.body.email !== 'librarian1@mail.com' ){
          response = 'no';
        }else{
          response = 'yes';
        }

    return response;
    

  }

  bcrypt.hash(req.body.password, saltRounds, (err,hash) => {
    var data = { fname:req.body.fname ,  lname:req.body.lname, username:req.body.username , email:req.body.email, password : hash, is_lib : checkEmail()}
    conn.query(addSQL, data , (err,rows) => {
      if (err) throw err;
      req.flash('success', 'Sign In successful!');
      res.redirect('/')
    })
  })
 
})

router.post('/authlogin', (req,res,next) => {
  var loginSQL = 'SELECT * FROM users WHERE email = ?  AND username  = ?';
  conn.query(loginSQL, [req.body.email , req.body.username] ,(err,rows) => {
    if(rows.length <= 0){
      req.flash('error', 'Invalid credentials');
      req.session.usernm = req.body.username ;
      req.session.email = req.body.email;
      res.redirect('/login');
    }else{
      bcrypt.compare(req.body.password , rows[0].password, (err,result) =>{
        if(result){
          req.flash('success', 'Welcome ' + req.body.username);
          req.session.loggedIn = true;
          req.session.is_lib = rows[0].is_lib
          req.session.userID = rows[0].id;
          req.session.fname = rows[0].fname;
          req.session.lname = rows[0].lname;
          req.session.usernm = req.body.username ;
          req.session.email = req.body.email;
          req.session.password = req.body.password ;
          res.redirect('/');
        }else{
          req.flash('error' , 'Password incorrect');
          req.session.usernm = req.body.username ;
          req.session.email = req.body.email;
          res.redirect('/login')
        }
      })
    }
   
  })
})





router.get('/logout' , (req,res) => {
  req.session.destroy()
  res.redirect('/');
})


module.exports = router;