var productsList
localStorage.getItem("productsList") == null ? productsList = [] : productsList = JSON.parse(localStorage.getItem("productsList"))
displayProducts(productsList)

var productName = document.getElementById("productname");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var productSearch = document.getElementById("productSearch");
var save_btn = document.getElementById("save_btn");
var counter;

function localStorageUpdate() {
  localStorage.setItem("productsList", JSON.stringify(productsList))
}

function addProduct() {
  if (validateName() && validatePrice() && validateCateg() && validateDesc()) {
    var product = {
      name: productName.value,
      price: productPrice.value,
      category: productCategory.value,
      description: productDesc.value,
    }
    productsList.push(product);
    localStorage.setItem("productsList", JSON.stringify(productsList))
    displayProducts(productsList)
    validateName()
    clearInputs()
    save_btn.classList.add("d-none");
  }

}

function displayProducts(productsList) {
  var backage = ``
  for (var i = 0; i < productsList.length; i++) {
    backage += ` <tr>
            <td>${i + 1}</td>
            <td>${productsList[i].newName ? productsList[i].newName : productsList[i].name}</td>
            <td>${productsList[i].price}</td>
            <td>${productsList[i].category}</td>
            <td>${productsList[i].description}</td>
            <td><button onclick="updateProducts(${i})"class="btn btn-warning bg-warning">Update</button></td>
            <td><button onclick="deleteProduct(${i})" class="btn btn-danger bg-danger text-white">Delete</button></td>
        </tr>`
    document.getElementById("tbody").innerHTML = backage;
  }
}

function deleteProduct(index) {
  productsList.splice(index, 1)
  displayProducts(productsList)
  localStorageUpdate()
}

function clearInputs() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
}

function updateProducts(index) {
  productName.value = productsList[index].name;
  productPrice.value = productsList[index].price;
  productCategory.value = productsList[index].category;
  productDesc.value = productsList[index].description;
  save_btn.classList.remove("d-none")
  counter = index;
}

function saveUpdate() {
  productsList[counter].name = productName.value;
  productsList[counter].price = productPrice.value;
  productsList[counter].category = productCategory.value;
  productsList[counter].description = productDesc.value;
  localStorageUpdate();
  displayProducts(productsList);
  save_btn.classList.add("d-none");
  clearInputs();
}

function searchProduct(data) {

  var newProductList = []

  for (let i = 0; i < productsList.length; i++) {
    var newData = data.toLowerCase()
    if (productsList[i].name.toLowerCase().includes(newData)) {
      productsList[i].newName = productsList[i].name.toLowerCase().replaceAll(newData, `<span class="text-warning">${newData}</span>`)
      newProductList.push(productsList[i]);
      displayProducts(newProductList)
      // productSearch.style.border="none";
      // document.getElementById("valideSearch").classList.add("d-none")
    }
    else {
      //  productSearch.style.border="solid 4px red";
      //  document.getElementById("valideSearch").classList.remove("d-none")
    }
  }
}

function validateName() {
  var regex = /^[A-Z][a-z]{1,}$/;
  if (regex.test(productName.value)) {
    productName.style.border = "none";
    document.getElementById("valideName").classList.add("d-none")
    return true;
  }
  else {
    productName.style.border = "solid 4px red";
    document.getElementById("valideName").classList.remove("d-none")
    return false;
  }
}

function validatePrice() {
  var regex = /^[1-9][0-9]{2,}$/;
  if (regex.test(productPrice.value)) {
    productPrice.style.border = "none";
    document.getElementById("validePrice").classList.add("d-none")
    return true;
  }
  else {
    productPrice.style.border = "solid 4px red";
    document.getElementById("validePrice").classList.remove("d-none")
    return false;
  }
}
function validateCateg() {
  var regex = /^[A-D]$/;
  if (regex.test(productCategory.value)) {
    productCategory.style.border = "none";
    document.getElementById("valideCateg").classList.add("d-none")
    return true;
  }
  else {
    productCategory.style.border = "solid 4px red";
    document.getElementById("valideCateg").classList.remove("d-none")
    return false;
  }
}
function validateDesc() {
  var regex = /^[A-Za-z]{3,100}$/;
  if (regex.test(productDesc.value)) {
    productDesc.style.border = "none";
    document.getElementById("valideDesc").classList.add("d-none")
    return true;
  }
  else {
    productDesc.style.border = "solid 4px red";
    document.getElementById("valideDesc").classList.remove("d-none")
    return false;
  }
}