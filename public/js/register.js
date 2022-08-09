let register_form = document.getElementById("register_form");

const registerUser=(event)=>{
    event.preventDefault();

    // getting data from form inputs
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let password_check = document.getElementById("password_check").value;


    if(password.length>=6){   //checking password input length
      if(password_check===password){  //checking if user re-enterd password correctly

        //checking if user already exist
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
             //if user managed to register insert his name and id to local storage
            // and loading main page
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




