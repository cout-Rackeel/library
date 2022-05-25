var express = require('express');
var router = express.Router();
var conn = require('../lib/db')



router.get('/' , (req,res,next) => {
  
    res.render('index' , {title:'Home Page' , stylesheet:'/stylesheets/index.css'  , bootstrap:true , my_session: req.session })
  
})


module.exports = router;