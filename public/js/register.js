let register_form = document.getElementById("register_form");

const registerUser=(event)=>{
    event.preventDefault();
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let password_check = document.getElementById("password_check").value;
    console.log(fname,lname,email,password);
    if(password.length>=0){
      if(password_check===password){
        fetch('http://localhost:3000/register',{
            method:'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify({fname,lname,email,password})
          })
        .then(res=>res.json())
        .then(data=>{
          if(data==false){
            alert('User already exists');
          }
          else{
            localStorage.clear();
            let user_id = data.user_id;
            let username = data.first_name +" "+ data.last_name;
            localStorage.setItem("user",JSON.stringify({username,user_id}))
            window.location.href="http://localhost:3000/"
          }
        })
        .catch(e=> {
            console.log(e);
          })
      }
      else{
          alert('Password does not match');
      }
    }
    else{
      alert('Password too short');
    }
}

register_form.addEventListener("submit",registerUser);




