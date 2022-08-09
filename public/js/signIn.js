let signIn_form = document.getElementById("signIn_form");


const signInUser=(event)=>{
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    fetch('http://localhost:3000/signIn',{
            method:'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify({email,password})
          })
        .then(res=>res.json())
        .then(data=>{
          if(data==false){
            
            alert('User does not exists');
          }
          else{
            //if user managed to sginin insert his name and id to local storage
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

signIn_form.addEventListener("submit",signInUser);



