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
  res.render('cart');
})
app.get('/search',(req,res)=>{
  res.render('product');
})

// 
//  POST requests
// 

// inserting products api info into the database
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

// inserting user info to database
app.post('/register',(req,res)=>{
    const {fname,lname,email,password} = req.body;
    checkIfExists(email,password) //checking if user exist
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

//checking if user exist
app.post('/signIn',(req,res)=>{
 
    const {email,password} = req.body;
    username=email;
    isSignedIn(email,password)
    .then(data=>{
        if(data.length){
            console.log(data[0]);
            res.json(data[0]);
        }   
        else {
            res.json(false);
        }
    });

})

// retrive user cart info
app.post('/cart',(req,res)=>{
  let {user_id}= req.body;
  console.log(user_id);
  try{
    db('cart')
    .innerJoin('users',function() {
        this.on('cart.user_id', '=', 'users.user_id')
    })
    .innerJoin('products',function() {
        this.orOn('cart.product_id', '=', 'products.product_id')
    })
    .select('*')
    .where({'users.user_id':user_id})
    .then(data=>{
      res.json(data)
    }).catch(err=>{
        console.log(err,);
    })
  }
  catch (err){
    res.status(400).json({err})
  }
})

// retrive searched products info
app.post('/search',(req,res)=>{
   let {search, category} = req.body;
//    console.log(search, category);
   try{
        if (category == 'All') {
                db('products')
                .select('*')
                .whereILike('title', `%${search}%`)
                .then(data=>{
                //   console.log(data);      
                  res.json(data)
                }).catch(err=>{
                    console.log(err);
                })     
        } else {
                db('products')
                .select('*')
                .where({category: category}) 
                .andWhereILike('title', `%${search}%`)
                .then(data=>{
                //   console.log(data);      
                  res.json(data)
                }).catch(err=>{
                    console.log(err);
                })  
        }
   }
   catch(e) {
        res.status(400).json({e});
   }
})

// inserting selected product info to cart table
app.post('/addedproducts',(req,res)=>{
        let {user_id, product_id} = req.body;
        console.log(user_id,product_id);
        try{
                db('cart').insert({
                        user_id,
                        product_id,
                })
                .returning ('*')
                .then (cartdb=>{
                        // console.log(cartdb);
                        res.json(cartdb);
                 })
                }
                catch(e) {
                res.status(400).json({e});
                }
})

//deleting all products from the cart table 
app.post('/deleteusercart',(req,res)=>{
  let {user_id} = req.body;
  try{
    db('cart')
    .where({user_id})
    .del()
    .then(res=>{
      console.log(res);
    })

  }
  catch(e) {
       res.status(400).json({e});
  }
})

//deleting product from the cart table 
app.post('/deletecartitem',(req,res)=>{
  let {cart_id} = req.body;
  console.log(cart_id);
  try{
    db('cart')
    .where({cart_id})
    .del()
    .then(res=>{
      console.log(res);
    })

  }
  catch(e) {
       res.status(400).json({e});
  }
})

// retrive total products price
app.post('/getotalprice',(req,res)=>{
  let {user_id}= req.body;
  try{
    db('cart')
    .innerJoin('users',function() {
        this.on('cart.user_id', '=', 'users.user_id')
    })
    .innerJoin('products',function() {
        this.orOn('cart.product_id', '=', 'products.product_id')
    })
    .sum('price')
    .where({'users.user_id':user_id})
    .then(data=>{
      res.json(data[0])
    }).catch(err=>{
        console.log(err);
    })
  }
  catch (err){
    res.status(400).json({err})
  }
})



// 
//DataBase select Fucntion
// 

//checking if user exist
function checkIfExists(email,password){
    return db.select('email','password').from ('users')
    .where({email,password});
}

//checking if user exist
function isSignedIn(email,password){
  return db.select('user_id','first_name','last_name').from ('users')
  .where({email,password});
}

app.listen(3000,()=>{
  console.log('server is running on port 3000');
});

