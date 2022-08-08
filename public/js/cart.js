// let register = document.getElementById("register");
let user_cart = document.querySelector(".user_cart");
user_cart.textContent= username + " Cart";
let Select_all_items = document.querySelector('.Select_all_items input');



const SelectAllCartItems=()=>{
  let select_item = document.querySelectorAll(".select_item")
  if(Select_all_items.checked){
    select_item.forEach(element => {
        element.checked = true;
    });
  }
  else{
    select_item.forEach(element => {
      element.checked = false;
  });
  }
}


const deleteDbCartItem=()=>{
  fetch('http://localhost:3000/deleteusercart',{
                method:'POST',
                headers: {
                'Content-Type':'application/json'
                },
                body: JSON.stringify({user_id})
            })
            .then(res=>res.json())
            .then(()=>{
                localStorage.removeItem("cart")
                window.location.href="http://localhost:3000/cart"

            })
            .catch(e=> {
                console.log(e);
            })
}

const deleteCartItems=(event)=>{
  const isSelected = event.target.parentElement
                    .parentElement.parentElement.firstElementChild;
  const parentElem = event.target.parentElement.parentElement.parentElement;
  console.log(isSelected);
  if(isSelected.checked)
  {
    parentElem.remove();
  }
}


const deleteDbCartItems=()=>{
  fetch('http://localhost:3000/deleteusercart',{
                method:'POST',
                headers: {
                'Content-Type':'application/json'
                },
                body: JSON.stringify({user_id})
            })
            .then(res=>res.json())
            .then(()=>{
                localStorage.removeItem("cart")
                window.location.href="http://localhost:3000/cart"

            })
            .catch(e=> {
                console.log(e);
            })
}

const deleteCartAllItems=(event)=>{
  let all_cart_items = document.querySelectorAll(".cart_item")
  if(Select_all_items.checked)
  {
    all_cart_items.forEach(element => {
        element.remove();
    });
    Select_all_items.checked = false
  }
  deleteDbCartItems();
}


const seteventListeners= ()=>{

  let delete_buttons = document.querySelectorAll(".cart_item_delete");
  delete_buttons.forEach(element => {
      element.addEventListener("click",deleteCartItems);
  });
  let delete_all_button = document.querySelector("#cart_delete_all");
  delete_all_button.addEventListener("click",deleteCartAllItems)
  
}
function displayCartItems(){
  let cart_items_data = JSON.parse(localStorage.getItem("cart"));
  cart_items_data.forEach(element => {
    // console.log(element);
      let {rating,title,image,price} = element;
      
      let quantity = document.createElement("div");
      quantity.classList.add("quantity");
      let minus = document.createElement("div");
      minus.textContent="-"
      minus.id = "minus";
      let amount = document.createElement("div");
      amount.id = "amount";
      amount.textContent = "2"
      let plus = document.createElement("div");
      plus.id = "plus";
      plus.textContent ="+"
      quantity.append(minus,amount,plus);

      let cart_item_delete = document.createElement("div");
      cart_item_delete.classList.add("cart_item_delete");
      let i = document.createElement("i");
      i.classList+="fa-regular fa-trash-can";
      cart_item_delete.appendChild(i);
      
  
      let cart_item_right = document.createElement("div");
      cart_item_right.classList.add("cart_item_right");
      cart_item_right.append(cart_item_delete,quantity);

      let cart_item_info = document.createElement("div");
      cart_item_info.classList.add("cart_item_info");
      let cart_item_title = document.createElement("div");
      cart_item_title.classList.add("cart_item_title");
      cart_item_title.textContent = title;
      let cart_item_description = document.createElement("div");
      cart_item_description.classList.add("cart_item_description");
      cart_item_description.textContent = rating;
      let cart_item_price = document.createElement("div");
      cart_item_price.classList.add("cart_item_price");
      cart_item_price.textContent=price;
      cart_item_info.append(cart_item_title,cart_item_description,cart_item_price);

      let product_img = document.createElement("div");
      product_img.classList.add("product_img");
      let img = document.createElement("img");
      product_img.append(img);
      img.src=image;

      let select_item = document.createElement("input");
      select_item.classList.add("select_item");
      select_item.type = "checkbox";

      let cart_item = document.createElement("div");
      cart_item.classList.add("cart_item");
      cart_item.append(select_item,product_img,cart_item_info,cart_item_right);
      // console.log(cart_item);

      let cart_items = document.querySelector(".cart_items");
      cart_items.append(cart_item);
  });
  seteventListeners();
}
displayCartItems();



Select_all_items.addEventListener("change",SelectAllCartItems);




