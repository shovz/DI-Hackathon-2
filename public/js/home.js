let cards_title = document.querySelectorAll(".card_title");
const filterProducts=(data)=>{
  let category = [];
  data.forEach(element => {
    category.push(element.category)
  });

  category= [...new Set(category)];
  return category;
}
const loadProductsToCards=(data)=>{
  let category = filterProducts(data);
  // console.log(products.image);
  for (let i = 0; i < category.length; i++) {
    cards_title[i].innerHTML = category[i];
    cards_title[7-i].innerHTML = category[i];
  }

  for (let i = 0; i < cards_title.length; i++) {
      if(cards_title[i].textContent==`men's clothing`){
        setSpreadItem(i,0);
      }
      if(cards_title[i].textContent==`jewelery`){
        let index= Math.floor(Math.random()*4+4);
          cards_title[i].nextElementSibling.children[0].src = data[index].image;
      }
      if(cards_title[i].textContent==`electronics`){
          setSpreadItem(i,8);
      }
      if(cards_title[i].textContent==`women's clothing`){
        let index= Math.floor(Math.random()*4+15);
          cards_title[i].nextElementSibling.children[0].src = data[index].image;
      }
  }
  function setSpreadItem (i,index){
    for (let j = 0; j < 4; j++) {
      cards_title[i].nextElementSibling.children[j].children[0].src = data[index].image;
      cards_title[i].nextElementSibling.children[j].children[1].textContent = data[index].price;
      index++;
    }

  }

}


const fetchProducts=(function(){
  let status=true;
  fetch("https://fakestoreapi.com/products")
  .then(res=> {
    return res.json()
  })
  .then(data=>{
    // console.log(status);
    if(status){
      fetch('http://localhost:3000/',{
        method:'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(res=>res.json())
      .then(is_inserted=>{
        console.log("inserting database database");
        status= is_inserted})
    .catch(err=> {
        console.log(err);
      })
    }
    loadProductsToCards(data);
  })
  .catch(err=>{
    console.log(err);
  })
})();








