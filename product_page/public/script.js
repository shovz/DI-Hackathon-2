function getProducts() {
    // const container = document.getElementById("container");
    fetch("https://fakestoreapi.com/products")
    .then(res=> {
        console.log(res);
        return res.json()})
    .then(data=>{
        console.log(data)
        loadProducts(data)})
        // loadProducts(data)
    .catch(e=>{
        console.log(e);
            })
}

getProducts()

function loadProducts(productArr) {
    const container = document.getElementById("products");
    for (let i = 0; i < productArr.length; i++) {
        console.log(productArr[i].title);
        const boxContainer = document.createElement('div');
        boxContainer.setAttribute('id', productArr[i].id)
        boxContainer.className = 'boxContainer';
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
        const descriptionBeneath = document.createElement('h6');
        descriptionBeneath.innerHTML = productDescription;
        boxContainer.appendChild(descriptionBeneath);
        container.appendChild(boxContainer);
    }
}
