
const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
const productDEsc = document.getElementById('productDesc');
const addBtn = document.getElementById('Add');
const charCount = document.getElementById('charCount');
const tableBody = document.getElementById('result');
let selectedIndex = -1;
let productNameRegex = /^[A-Z][a-z]{2,4}$/;
let productPriceRegex = /^[1-9][0-9]{2,4}$|(100000)$/;
let productDEscRegex = /^[a-z|0-9|" "|A-Z]{3,100}$/;
let products;


if (localStorage.getItem("productsList")) {

    products = JSON.parse(localStorage.getItem("productsList"));

    displayProducts(products);

} else {
    products = [];
}

productName.addEventListener("keyup", productNameValid);
productPrice.addEventListener("keyup", productPriceValid)
productDEsc.addEventListener("keyup", productDEscValid)
productDEsc.addEventListener('input', countChar);


addBtn.addEventListener("click", () => {
    if (addBtn.innerHTML == "Add Product") {
        addProduct();
    } else {
        updateProduct();
    }
});

function productNameValid() {
    if (productNameRegex.test(productName.value)) {
        productName.classList.remove("is-invalid");
        productName.classList.add("is-valid");
    } else if (productName.value == "") {
        productName.classList.remove("is-invalid");
        productName.classList.remove("is-valid");

    } else {
        productName.classList.remove("is-valid");
        productName.classList.add("is-invalid");
    }
}

function productPriceValid() {
    if (productPriceRegex.test(productPrice.value)) {
        productPrice.classList.remove("is-invalid");
        productPrice.classList.add("is-valid");
    } else if (productPrice.value == "") {
        productPrice.classList.remove("is-invalid");
        productPrice.classList.remove("is-valid");

    } else {
        productPrice.classList.remove("is-valid");
        productPrice.classList.add("is-invalid");
    }
}

function productDEscValid() {
    if (productDEscRegex.test(productDEsc.value)) {
        productDEsc.classList.remove("is-invalid");
        productDEsc.classList.add("is-valid");
    } else if (productDEsc.value == "") {
        productDEsc.classList.remove("is-invalid");
        productDEsc.classList.remove("is-valid");

    } else {
        productDEsc.classList.remove("is-valid");
        productDEsc.classList.add("is-invalid");
    }
}

function countChar() {
    let lengthTxt = productDEsc.value.length;
    charCount.innerHTML = lengthTxt + ' characters';
}

function addProduct() {

    if (productName.value.trim() == "" || productPrice.value.trim() == "" || productDEsc.value.trim() == "") {
        alert("Please fill in all fields.");
        return;
    }

    let product = {
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

    let result = '';

    for (let i = 0; i < products.length; i++) {

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

    productName.classList.remove("is-invalid");
    productName.classList.remove("is-valid");
    productPrice.classList.remove("is-invalid");
    productPrice.classList.remove("is-valid");
    productDEsc.classList.remove("is-invalid");
    productDEsc.classList.remove("is-valid");
}

function searchProduct(term) {
    let newData = products.filter((product) => {
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
    let product = products[i]
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

    let product = {
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