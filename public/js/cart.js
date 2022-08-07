// let register = document.getElementById("register");
let user_cart = document.querySelector(".user_cart");
user_cart.textContent= JSON.parse(localStorage.getItem("user")) + " Cart";

let Select_all_items = document.querySelector('.Select_all_items input');


const displayCartItems=(event)=>{
    event.preventDefault();
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("user").value;
    let password = document.getElementById("password").value;
    fetch('http://localhost:3000/',{
        method:'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({fname,lname,email,username,password})
      })
    .then(res=>res.json())
    .then(data=>{
      if(data==false){
        h1.textContent = "Username already exists";
      }
      else{
          h1.textContent = `hello ${data.fname+ " "+ data.lname} your account is now created`;
      }
    })
    .catch(e=> {
        console.log(e);
      })

}


const SelectAllCartItems=()=>{
  
  if(Select_all_items.checked){

  }
}
Select_all_items.addEventListener("change",SelectAllCartItems);




