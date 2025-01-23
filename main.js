
var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productDEsc = document.getElementById('productDesc');
var addBtn = document.getElementById('Add');
var selectedIndex = -1;

var tableBody = document.getElementById('result');

var products;

if (localStorage.getItem("productsList")) {

    products = JSON.parse(localStorage.getItem("productsList"));

    displayProducts(products);

} else {
    products = [];
}

addBtn.addEventListener("click", function () {
    if (addBtn.innerHTML == "Add Product") {
        addProduct();
    } else {
        updateProduct();
    }
});

function addProduct() {

    if (productName.value.trim() == "" || productPrice.value.trim() == "" || productDEsc.value.trim() == "") {
        alert("Please fill in all fields.");
        return;
    }

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
                        <td><button id="update" class="btn btn-success" onclick="selectProduct(${i})" >Update</button></td>
                        <td><button id="del" class="btn btn-danger" onclick="deleteProduct(${i})" >Delete</button></td>
                    </tr>    
                `

    }

    tableBody.innerHTML = result;
}

function clearForm() {

    productName.value = '';
    productPrice.value = '';
    productDEsc.value = '';
    addBtn.innerHTML = "Add Product";
    addBtn.classList.remove("btn-success");
    addBtn.classList.add("btn-primary");


}

function searchProduct(term) {
    var newData = products.filter(function (product) {
        return product.productName.includes(term.trim());
    })

    console.log(newData);

    displayProducts(newData);

}

function deleteProduct(i) {

    products.splice(i, 1);
    localStorage.setItem("productsList", JSON.stringify(products));
    displayProducts(products);
    console.log(products);

}

function selectProduct(i) {
    selectedIndex = i;
    var product = products[i]
    productName.value = product.productName;
    productPrice.value = product.productPrice;
    productDEsc.value = product.productDesc;
    addBtn.innerHTML = "Update Product";
    addBtn.classList.remove("btn-primary");
    addBtn.classList.add("btn-success");
}

function updateProduct() {

    if (productName.value.trim() == "" || productPrice.value.trim() == "" || productDEsc.value.trim() == "") {
        alert("Please fill in all fields.");
        return;
    }

    var product = {
        productName: productName.value,
        productPrice: productPrice.value,
        productDesc: productDEsc.value
    };
    products[selectedIndex] = product;
    localStorage.setItem("productsList", JSON.stringify(products));
    displayProducts(products);
    console.log(products);
    clearForm();

}