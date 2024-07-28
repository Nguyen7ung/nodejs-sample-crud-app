const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const conn = require('./databases/mysql');

/*Set EJS template Engine*/
app.set('views','./views');
app.set('view engine','ejs');

const path = __dirname + '/views/';
const port = 3000;

const NODE_ENV = process.env.NODE_ENV || 'development';
app.listen(port);
console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Get Data
app.get("/", (req,res, next) =>{
  var query = conn.query('SELECT * FROM users', function(err, items){
    if(err){
      console.log(err);
      return next("Mysql error, check your query");
    }
    res.render(path + "/index.ejs", {title:port, data:items});
    });

});

// Insert Data
app.post("/api/user", function(req,res,next){

  var data = {
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      email:req.body.email,
      phone:req.body.phone
  };

  var query = conn.query("INSERT INTO users set ? ",data, function(err, item){

    if(err){
    console.log(err);
    return next("Mysql error, check your query");
    }

    res.sendStatus(200);

    });

});

// Update Data
app.get("/api/user/:user_id", function(req, res, next){

  var user_id = req.params.user_id;
  var query = conn.query("SELECT * FROM users WHERE id = ? ",[user_id],function(err,item){

    if(err){
        console.log(err);
        return next("Mysql error, check your query");
    }

    //if user not found
    if(item.length < 1)
        return res.send("User Not found");
        res.render(path + '/edit.ejs',{title:"Edit user",data:item});
    });

});

app.put("/api/user/edit", function(req,res,next){
  var user_id = req.body.id;
  var data = {
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      email:req.body.email,
      phone:req.body.phone
  };

  var query = conn.query("UPDATE users set ? WHERE id = ? ",[data,user_id], function(err, result){

    if(err){
    console.log(err);
    return next("Mysql error, check your query");
    }

    res.sendStatus(200);

    });


});

// Delete Data
app.delete("/api/user/:id", function(req,res,next){

  var user_id = req.params.id;
  var query = conn.query("DELETE FROM users WHERE id = ? ",[user_id], function(err, results){
    if(err){
      console.log(err);
      return next("Mysql error, check your query");
    }

    res.sendStatus(200);

    });
});

module.exports = app;