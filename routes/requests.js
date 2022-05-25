var express = require('express');
var router = express.Router();
var conn = require('../lib/db')



router.get('/' , (req,res,next) => {
  
    res.render('requests/requests-list' , {title:'Requests Page' , stylesheet:'/stylesheets/index.css'  , bootstrap:true , my_session: req.session })
  
})

router.get('/selection/:id' , (req,res,next) => {
    if(!req.session.loggedIn){
      req.flash('error','You must first be logged in')
      res.redirect('/login');
    }else{
      res.send('wow')
    }
  })


module.exports = router;