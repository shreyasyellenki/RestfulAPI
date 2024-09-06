const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
let db = new sqlite3.Database('RestfulAPI.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
  
 /* db.serialize(() => {
    db.each(`SELECT Film as id,
                    Budget as name
             FROM dc_marvel_movie_performance`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.id + "\t" + row.name);
    });
  });
*/
  

app.get('/', (req,res) => {
    res.send("Welcome");
});

app.get('/status', (req,res) => {
    res.send("Welcome Status");
});

app.get('/dc_marvel_movie_performance', (req,res) => {
   // res.send(req.query);
    //res.send(req.query.film);
    if(req.query.film != null){
      let sql = 'SELECT * FROM dc_marvel_movie_performance WHERE film = ' + req.query.film;
      db.get(sql,[], (err, row)=>{
        if(err)
          return console.error(err.message);
      res.send(row);
    });
  }
    if(req.query.franchise != null){
      //res.send(req.query.franchise);
      let sql = 'SELECT * FROM dc_marvel_movie_performance WHERE franchise = ' + req.query.franchise;
      
      db.all(sql,[], (err, rows)=>{
        if(err)
          return console.error(err.message);
        //  var array = [];
       res.json(rows);
        //res.send(array);
    });
     
    }
});


app.get('/books', (req,res) => {
  // res.send(req.query);
   //res.send(req.query.film);
   if(req.query.title != null){
     let sql = 'SELECT * FROM books WHERE title = ' + req.query.title;
     db.get(sql,[], (err, row)=>{
       if(err)
         return console.error(err.message);
     res.send(row);
   });
 }
   if(req.query.authors != null){
     //res.send(req.query.franchise);
     let sql = 'SELECT * FROM books WHERE authors = ' + req.query.authors;
     
     db.all(sql,[], (err, rows)=>{
       if(err)
         return console.error(err.message);
         var array = [];
       rows.forEach((row) => {
          array.push(row);
       });
       res.send(array);
   });
    
   }
});







app.listen(4000, ()=>{
    console.log("listening to 4000")
});