var express = require('express');
var router = express.Router();
var conn = require('../lib/db')
var bcrypt = require('bcrypt');



router.get('/' , (req,res,next) => {
  
    res.render('requests/requests-list' , {title:'Requests Page' , stylesheet:''  , bootstrap:true , my_session: req.session })
  
})

router.get('/selection/:id' , (req,res,next) => {
    if(!req.session.loggedIn){
      req.flash('error','You must first be logged in')
      res.redirect('/login');
    }else{
        var selectSQL = 'SELECT * FROM books WHERE books.id = ' + req.params.id
        conn.query(selectSQL, (err,rows) => {
            if (err) throw err;
            res.render('requests/requests-form' , {title:'Requests Page' , stylesheet:''  , bootstrap:false , my_session: req.session , data:rows[0] })
        })
        
    }
  })

//   router.post('/request-list' , (req,res,next) => {
//     conn.query("UPDATE requested_books SET status_id = 2" , (err,rows) =>{
//         console.log('done' + err);
//         res.send('um')
//     })
//   })

  router.get('/request-list-all' , (req,res,next) => {
    var listSQL = 'SELECT u.id, u.fname , u.lname , bk.bk_nm , rb.bk_id, bs.status FROM library.requested_books rb , library.books bk , library.book_statuses bs , library.users u WHERE rb.student_id = u.id AND rb.bk_id = bk.id AND bk.status_id = bs.id' ;

    conn.query(listSQL , (err,rows) =>{
       if (err) throw err;
        if(req.session.is_lib === 'yes'){
            res.render('requests/requests-list' , {title:'Requests-List Page' , stylesheet:''  , bootstrap:true , my_session: req.session , data:rows })
        }else{
            res.redirect('/')
        }
            
    })


  } )


  router.get('/request-list' , (req,res,next) => {
    var ind = req.session.userID || 0;
    var listSQL = 'SELECT u.id, u.fname , u.lname , bk.bk_nm , bs.status FROM library.requested_books rb , library.books bk , library.book_statuses bs , library.users u WHERE rb.student_id = u.id AND rb.bk_id = bk.id AND bk.status_id = bs.id AND u.id = ' + ind;

    conn.query(listSQL , (err,rows) =>{
       if (err) throw err;
            res.render('requests/requests-list' , {title:'Requests-List Page' , stylesheet:''  , bootstrap:true , my_session: req.session , data:rows })
    })


  } )


  router.post('/add-request' , (req,res,next) => {
    var booksRequested = req.session.booksRequested;
    var canRequest = true;

    booksRequested.forEach(bkRequest => {
      if(bkRequest == req.body.bookID){
        canRequest = false
      }else{
        canRequest = true;
      }
    });

    console.log(canRequest);

    if(canRequest){
      var addSQL = 'INSERT INTO requested_books SET ? ';
             var data = {student_id: req.body.userID , bk_id: req.body.bookID , requested_id: req.body.date}
             conn.query(addSQL, data , (err,rows) => {
                if (err) throw err
                req.flash('success', 'Book requested to borrow');
                req.session.booksRequested.push(req.body.bookID);
                res.redirect('/books')
      })
    }else{
      req.flash('error', 'Book already requested');
      res.redirect('/books');
    }
    
  
  });




module.exports = router;