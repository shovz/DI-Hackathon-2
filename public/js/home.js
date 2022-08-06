let searchForm = document.getElementsByTagName("form")[0];
let search = document.getElementById("search_Category");
let product_search;


const searchProduct=(event)=>{
    event.preventDefault();
    let select_Category = getCategory();
    fetch('http://localhost:5000/product_page',{
        method:'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({select_Category,product_search})
      })
    .catch(err=> {
        console.log(err);
      })

}
const getCategory=()=>{
    let select_Category = document.getElementById("select_Category").value;
    let category = document.getElementById("select_Category")
    category.addEventListener('change',(event)=>{
        select_Category = event.target.value;
    })
    return select_Category
}

search.addEventListener('input',(event)=>{
    product_search = event.target.value;
})
searchForm.addEventListener("submit",searchProduct);




