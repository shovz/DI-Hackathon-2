// let register = document.getElementById("register");
let user_cart = document.querySelector(".user_cart");
user_cart.textContent= JSON.parse(localStorage.getItem("user")) + " Cart";

let Select_all_items = document.querySelector('.Select_all_items input');



const SelectAllCartItems=()=>{
  
  if(Select_all_items.checked){

  }
}


Select_all_items.addEventListener("change",SelectAllCartItems);




