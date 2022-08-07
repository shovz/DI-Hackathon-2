function getProducts() {
    // const container = document.getElementById("container");
    fetch("https://fakestoreapi.com/products")
    .then(res=> {
        console.log(res);
        return res.json()})
    .then(data=>{
        console.log(data)
        // filterItems(data)})
        loadProducts(data)})
        // loadProducts(data)
    .catch(e=>{
        console.log(e);
            })
}

getProducts()

function clickItems() {
    buttons = document.getElementsByClassName('filter');
    console.log(buttons);
    for (button in buttons) {
        buttons[button].addEventListener("click", filterItems);
    }
}

clickItems();

function filterItems(e){ // still working on price filter, but this is for categories
    console.log(e.target.id);
    products = document.getElementsByClassName('boxContainer');
    for (let i = 0; i < products.length; i++) {
        if (e.target.id == 'men' && products[i].id > 4) {
            products[i].style.display = 'none'
            console.log(products[i]);
        } else if (e.target.id == 'men' && products[i].id <= 4) {
            products[i].style.display = 'block';
        }
        if (e.target.id == 'women' && products[i].id < 15) {
            products[i].style.display = 'none'
        } else if (e.target.id == 'women' && products[i].id >= 15) {
            products[i].style.display = 'block'
        }
        if (e.target.id == 'jewelry' && (products[i].id < 5 || products[i].id > 8)) {
            products[i].style.display = 'none'
        } else if (e.target.id == 'jewelry' && (products[i].id >= 5 || products[i].id <= 8)) {
            products[i].style.display = 'block'
        }
        if (e.target.id == 'electronics' && (products[i].id < 9 || products[i].id > 14)) {
            products[i].style.display = 'none'
        } else if (e.target.id == 'electronics' && (products[i].id < 9 || products[i].id > 14)) {
            products[i].style.display = 'block'
        }
    }
}
    //load products, with an array of just the one's with the ID
    // loop through the loadproduct array, and only display the filter.


function loadProducts(productArr) {
    const container = document.getElementById("products");
    for (let i = 0; i < productArr.length; i++) {
        const boxContainer = document.createElement('div');
        boxContainer.setAttribute('id', productArr[i].id)
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
        container.appendChild(boxContainer);
    }
}

// function for loading categories

// add event listener of each category category 
