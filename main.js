
var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productDEsc = document.getElementById('productDesc');

var tableBody = document.getElementById('result');

var products;

if (localStorage.getItem("productsList")) {

    products = JSON.parse(localStorage.getItem("productsList"));

    displayProducts(products);

} else {
    products = [];
}

function addProduct() {

    var product = {
        productName: productName.value,
        productPrice: productPrice.value,
        productDesc: productDEsc.value
    }

    products.push(product);

    console.log(products);

    localStorage.setItem("productsList", JSON.stringify(products))

    displayProducts(products);

    clearForm();
}

function displayProducts(products) {

    var result = '';

    for (var i = 0; i < products.length; i++) {

        result += `
                    <tr>
                        <td>${products[i].productName}</td>
                        <td>${products[i].productPrice}</td>
                        <td>${products[i].productDesc}</td>
                    </tr>    
                `

    }

    tableBody.innerHTML = result;
}

function clearForm() {

    productName.value = '';
    productPrice.value = '';
    productDEsc.value = '';

}

function searchProduct(term) {
    var newData = products.filter(function (product) {
        return product.productName.includes(term.trim());
    })

    console.log(newData);

    displayProducts(newData);

}