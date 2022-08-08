let home = document.querySelector(".logo");
let searchForm = document.getElementsByTagName("form")[0];
let search = document.getElementById("search_Category");
let product_search="";
home.addEventListener("click",()=>{
     window.location.href="http://localhost:3000/"
 })

 const getCategory=()=>{
    let select_Category = document.getElementById("select_Category").value;
    return select_Category
}

const searchProduct=(event)=>{
event.preventDefault();
    // localStorage.removeItem("search");
    let select_Category = getCategory();
    localStorage.setItem("search",JSON.stringify({select_Category:select_Category,product_search:product_search}))
    window.location.href="http://localhost:3000/search"

}



search.addEventListener('input',(event)=>{
product_search = event.target.value;


searchForm.addEventListener("submit",searchProduct);
})


search.addEventListener('input',(event)=>{product_search = event.target.value
})
searchForm.addEventListener("submit",searchProduct);