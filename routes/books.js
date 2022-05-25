var express = require('express');
var router = express.Router();
var conn = require('../lib/db')


router.get('/' , (req,res,next) => {
  var str = 'All Categories';
  var bookSQL = "SELECT bk.id, bk.bk_nm , bc.bk_cats FROM library.books bk , library.book_cats bc WHERE bk_cat_id = bc.id  ";

    conn.query( bookSQL , (err,rows) => {
      if(err) throw err;
      console.log(rows);
      res.render('books/books-section' , {title:'Stony Stories - Books Page' , stylesheet:'/stylesheets/books.css' , data:rows, category:str , bootstrap:false , my_session : req.session})
    })
  
})

router.post('/' , (req,res,next) => {
  var str = req.body.category;
  var bookSQL = "SELECT bk.id , bk.bk_nm , bc.bk_cats FROM library.books bk , library.book_cats bc WHERE bk_cat_id = bc.id AND bc.bk_cats LIKE '"+ str +"%' ";

    conn.query( bookSQL , (err,rows) => {
      if(err) throw err;
      console.log(str);
      console.log(rows);
      res.render('books/books-section' , {title:'Stony Stories - Books Page' , stylesheet:'/stylesheets/books.css' , data:rows , category:str , bootstrap:false , my_session: req.session })
    })


  })

  


module.exports = router;