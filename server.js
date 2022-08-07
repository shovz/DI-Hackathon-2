const express = require('express');
const knex = require('knex');

const db = knex({
    client:'pg',
    connection:{
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'test', //enter your password
      database: 'Big_Buyers'
    }
  })
const app = express();

// setting view folder + engine
app.set('view engine','ejs');
app.set('views', __dirname + '/views');

// Define Uses
app.use('/',express.static(__dirname +"/public"));
app.use('/register',express.static(__dirname +"/public"));
app.use('/signIn',express.static(__dirname +"/public"));
app.use('/cart',express.static(__dirname +"/public"));
app.use('/search',express.static(__dirname +"/public"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));



//  GET requests
app.get('/',(req,res)=>{
    res.render('home');
})
app.get('/register',(req,res)=>{
    res.render('register');
})
app.get('/signIn',(req,res)=>{
  res.render('signIn')
})
app.get('/cart',(req,res)=>{
  res.render('cart')
})
app.get('/search',(req,res)=>{
  res.render('product');
})
//  POST requests
app.post('/',(req,res)=>{
  db.select('*').from ('products')
    .then(productsDB=>{ 
      if(!productsDB.length) {
        req.body.forEach(element => {
          db('products').insert({
            title : element.title,
            category :element.category,
            description :element.description,
            image:element.image,
            price: Number(element.price),
            rating: Number(element.rating.rate),
            votes_count: Number(element.rating.count)
        })
        .catch (err=>{
            console.log(err);
      })
    });
      res.json(false)
      } 
    })
    .catch (err=>{
      console.log(err);
    })
})
app.post('/register',(req,res)=>{
    const {fname,lname,email,password} = req.body;
    // console.log(fname,lname,email,password);
    checkIfExists(email,password)
    .then(data=>{
        if(!data.length){
            db('users').insert({
              first_name : fname,
              last_name : lname,
              email,
              password
          })
          .returning ('*')
          .then (user=>{
            res.json(user[0]);
          })
          .catch (err=>{
              console.log(err);
        })
        }     
        else{
            res.json(false)
        } 
    });

})
app.post('/signIn',(req,res)=>{
    const {email,password} = req.body;
    // console.log(email,password);
    isSignedIn(email,password)
    .then(data=>{
        if(data.length){
            res.json(data[0]);
        }   
        else {
            res.json(false);
        }
    });

})
app.post('/search',(req,res)=>{
  const {select_Category,product_search} = req.body;
  console.log(select_Category,product_search);
  res.json(true)
})



//DataBase select Fucntion
function checkIfExists(email,password){
    return db.select('email','password').from ('users')
    .where({email,password});
}
function isSignedIn(email,password){
  return db.select('first_name','last_name').from ('users')
  .where({email,password});
}
app.listen(3000,()=>{
  console.log('server is running on port 3000');
});
