const { request } = require('express');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/',express.static(__dirname+'/public/product_page'));

app.listen(5000,()=>{
        console.log('server is running on port 5000');
      });
      

app.get('/product_page', (req,res)=>{
        res.sendFile(__dirname+'/public/product_page/products.html');      
})


