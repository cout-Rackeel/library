var express = require('express');
var router = express.Router();
var conn = require('../lib/db')



router.get('/' , (req,res,next) => {
  
    res.render('index' , {title:'Home Page' , stylesheet:'/stylesheets/index.css'})
  
})


module.exports = router;