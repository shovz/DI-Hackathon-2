// function getProducts() {
//     // const container = document.getElementById("container");
//     fetch("https://fakestoreapi.com/products")
//     .then(res=> {
//         // console.log(res);
//         return res.json()})
//     .then(data=>{
//         // console.log(data)
//         // filterItems(data)})
//         loadProducts(data)})
//         // loadProducts(data)
//     .catch(e=>{
//         console.log(e);
//             })
// }

// getProducts()

//  function clickItems() {
//     let buttons = document.getElementsByClassName('filter');
//     let temp = document.getElementById("products")
//     for (let i =0;i<buttons.length-1;i++) {
//         buttons[i].addEventListener("click", filterItems);
//     }
// }

// clickItems();

function getStorage() {
    let {select_Category, product_search} = JSON.parse(localStorage.getItem("search"))
    console.log(select_Category, product_search);
    filterItemsOne(select_Category, product_search);
}

getStorage();

function filterItemsOne(category, search) {
    fetch('http://localhost:3000/search',{
        method:'POST',
        headers: {
        'Content-Type':'application/json',
        },
        body: JSON.stringify({
            category,
            search
        })
    })
    .then(res=>res.json())
    .then(dbdata=>{
        localStorage.removeItem("search");
        loadProducts(dbdata);
        console.log(dbdata);
    })
    .catch(e=> {
        console.log(e);
    })
   
}  



// function filterItems(e){ // still working on price filter, but this is for categories
//     console.log(e.target.id);
//     products = document.getElementsByClassName('boxContainer');
//     for (let i = 0; i < products.length; i++) {
//         if (e.target.id == 'men' && products[i].id > 4) {
//             products[i].style.display = 'none'
//             console.log(products[i]);
//         } else if (e.target.id == 'men' && products[i].id <= 4) {
//             products[i].style.display = 'block';
//         }
//         if (e.target.id == 'women' && products[i].id < 15) {
//             products[i].style.display = 'none'
//         } else if (e.target.id == 'women' && products[i].id >= 15) {
//             products[i].style.display = 'block'
//         }
//         if (e.target.id == 'jewelry' && (products[i].id < 5 || products[i].id > 8)) {
//             products[i].style.display = 'none'
//         } else if (e.target.id == 'jewelry' && (products[i].id >= 5 || products[i].id <= 8)) {
//             products[i].style.display = 'block'
//         }
//         if (e.target.id == 'electronics' && (products[i].id < 9 || products[i].id > 14)) {
//             products[i].style.display = 'none'
//         } else if (e.target.id == 'electronics' && (products[i].id < 9 || products[i].id > 14)) {
//             products[i].style.display = 'block'
//         }
//     }
// }
    //load products, with an array of just the one's with the ID
    // loop through the loadproduct array, and only display the filter.


function loadProducts(productArr) {
    const container = document.getElementById("products");
    for (let i = 0; i < productArr.length; i++) {
        console.log('inside');
        const boxContainer = document.createElement('div');
        const cartButton = document.createElement('button');
        cartButton.textContent = "Add to Cart";
        cartButton.addEventListener("click", cartButtonClicked);
        boxContainer.setAttribute('id', i+1)
        boxContainer.classList.add('boxContainer'); 
        const productName = productArr[i].title;
        const productPrice = productArr[i].price;
        const productDescription = productArr[i].description;
        const productImage = productArr[i].image;
        const nameBeneath = document.createElement('h6');
        nameBeneath.innerHTML = productName;
        boxContainer.appendChild(nameBeneath);
        // image tag
        const imageBeneath = document.createElement('img');
        imageBeneath.src = productImage;
        boxContainer.appendChild(imageBeneath);
        const priceBeneath = document.createElement('h5');
        priceBeneath.innerHTML = `$ ${productPrice}`;
        boxContainer.appendChild(priceBeneath);
        const descriptionBeneath = document.createElement('p');
        descriptionBeneath.innerHTML = productDescription;
        boxContainer.appendChild(descriptionBeneath);
        boxContainer.appendChild(cartButton);
        container.appendChild(boxContainer);
    }
}

function cartButtonClicked(e) {
    console.log(e.target.parentElement);
    let productId = e.target.parentElement.id;
    // let {userId} = JSON.parse(localStorage.getItem("user"))
    userId = 1;
    console.log(productId)
    addToCart(userId, productId)
}

function addToCart(user_id, product_id) {
    console.log(user_id, product_id);
    fetch('http://localhost:3000/addedproducts',{
        method:'POST',
        headers: {
        'Content-Type':'application/json',
        },
        body: JSON.stringify({
            user_id,
            product_id
        })
    })
        .then(res=>res.json())
        .then(dbdata=>{
            localStorage.removeItem("search");
            loadProducts(dbdata);
            console.log(dbdata);
        })
        .catch(e=> {
            console.log(e);
        })
    
}


// function for loading categories

// add event listener of each category category 