const { request } = require('express');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/',express.static(__dirname+'/product_page/public'));

app.listen(5000,()=>{
        console.log('server is running on port 5000');
      });
      

app.get('/product_page', (req,res)=>{
        res.sendFile(__dirname+'/product_page/public/products.html');
        
        // console.log(req.headers);
        // .then(data=>{
        //   console.log(data);
        //   res.json(data)
        // })
        // .catch(e=>{
        //   console.log(e);
        // })
})
