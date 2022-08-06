// let register = document.getElementById("register");
let h1 = document.createElement("h1");
document.body.append(h1);

const registerUser=(event)=>{
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

// register.addEventListener("submit",registerUser);




