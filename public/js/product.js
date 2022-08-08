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
        loadProducts(dbdata);
        filterProducts(dbdata)
        // console.log(dbdata);
    })
    .catch(e=> {
        console.log(e);
    })
   
}  


function filterProducts(dbdata) {
    let high = document.getElementById('high');
    let low = document.getElementById('low');
    let rating = document.getElementById('rating');
    high.addEventListener('click', () => {
        let filteredArr = highLow(dbdata);
        loadProducts(filteredArr);
    })
    low.addEventListener('click', () => {
        let filteredArr = lowHigh(dbdata);
        loadProducts(filteredArr);
    })
    rating.addEventListener('click', () => {
        let filteredArr = rating(dbdata);
        loadProducts(filteredArr);
    })
}

function highLow (Arr) {
    console.log(Arr);
}




function loadProducts(productArr) {
    console.log(productArr);
    if (productArr.length === 0) {
        const container = document.getElementById("products");
        const message = document.createElement('h1');
        message.textContent = 'No products found. Please widen your search';
        document.body.insertBefore(message,container);
    } else{
        let high = document.getElementById('high')
        high.addEventListener('click', highLow)
        const container = document.getElementById("products");
        for (let i = 0; i < productArr.length; i++) {
            // console.log('inside');

            const boxContainer = document.createElement('div');
            const cartButton = document.createElement('button');

            cartButton.textContent = "Add to Cart";
            cartButton.addEventListener("click", cartButtonClicked);
            cartButton.classList = "add_to_cart_btn"
            boxContainer.setAttribute('id', i+1)
            boxContainer.classList.add('boxContainer'); 

            const productName = productArr[i].title;
            const productPrice = productArr[i].price;
            const productDescription = productArr[i].description;
            const productImage = productArr[i].image;
            const nameBeneath = document.createElement('h4');
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
}

function cartButtonClicked(e) {
    // console.log(e.target.parentElement);
    let product_id = e.target.parentElement.id;
    let {user_id} = JSON.parse(localStorage.getItem("user"))
    console.log(user_id, product_id);
    addToCart(user_id, product_id)
}

function addToCart(user_id, product_id) {
    // console.log(user_id, product_id);
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
            console.log(dbdata);
            alert("item added to cart")

        })
        .catch(e=> {
            console.log(e);
        })

    
}
