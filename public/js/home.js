let cards_title = document.querySelectorAll(".card_title");

//sfillters products api data and creating array 
// of categories with no double values
const filterProducts=(data)=>{
  let category = [];
  data.forEach(element => {
    category.push(element.category)
  });

  category= [...new Set(category)];
  return category;
}

///loading products data to home page,
// setting cards info
const loadProductsToCards=(data)=>{
  let category = filterProducts(data);
  for (let i = 0; i < category.length; i++) {
    cards_title[i].innerHTML = category[i];
    cards_title[7-i].innerHTML = category[i];
  }

   //setting cards titles
  for (let i = 0; i < cards_title.length; i++) {
       //setting cards with 4 img layout 
      if(cards_title[i].textContent==`men's clothing`){
        setSpreadItem(i,0);
      }
      //setting cards with 1 img layout 
      if(cards_title[i].textContent==`jewelery`){
        let index= Math.floor(Math.random()*4+4);
          cards_title[i].nextElementSibling.children[0].src = data[index].image;
      }
      //setting cards with 4 img layout
      if(cards_title[i].textContent==`electronics`){
          setSpreadItem(i,8);
      }

       //setting cards with 1 img layout 
      if(cards_title[i].textContent==`women's clothing`){
        let index= Math.floor(Math.random()*4+15);
          cards_title[i].nextElementSibling.children[0].src = data[index].image;
      }
  }

  //setting cards with 4 img layout 
  function setSpreadItem (i,index){
    for (let j = 0; j < 4; j++) {
      cards_title[i].nextElementSibling.children[j].children[0].src = data[index].image;
      cards_title[i].nextElementSibling.children[j].children[1].textContent = data[index].price;
      index++;
    }

  }

}




///fetching products data from api
const fetchProducts=(function(){
  let status=true;
  fetch("https://fakestoreapi.com/products")
  .then(res=> {
    return res.json()
  })
  .then(data=>{ 
    if(status){  ///inserting products data to the database 
      fetch('http://localhost:3000/',{
        method:'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res=>res.json())
      .then(is_inserted=>{
        status= is_inserted})
    .catch(err=> {
        console.log(err);
      })
    }
    loadProductsToCards(data); ///loading products data to home page
  })
  .catch(err=>{
    console.log(err);
  })
})();


