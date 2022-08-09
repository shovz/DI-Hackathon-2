let home = document.querySelector(".logo");
let searchForm = document.getElementsByTagName("form")[0];
let search = document.getElementById("search_Category");
let product_search="";


//setting company logo to home page
home.addEventListener("click",()=>{
     window.location.href="http://localhost:3000/"
 })


const searchProduct=(event)=>{
    event.preventDefault();
    let select_Category = document.getElementById("select_Category").value;//fetching Category input
    localStorage.setItem("search",JSON.stringify({ //saving search inputs to local storage
        select_Category:select_Category,
        product_search:product_search
    }))
    window.location.href="http://localhost:3000/search" //loading searched products page
}


//fetching search input
search.addEventListener('input',(event)=>{product_search = event.target.value;})

searchForm.addEventListener("submit",searchProduct);
